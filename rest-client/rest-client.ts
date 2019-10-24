// documentation: https://www.npmjs.com/package/node-rest-client
import { Client } from "node-rest-client";
import { ObjectsUtil } from "taulukko-common-util";

export class RestClient {

    public defaultArgs = {
        headers: { "Content-Type": "application/json" },
        parameters: {},
        data: {},
    };

    private objects: ObjectsUtil = new ObjectsUtil();

    private readonly client = new Client();

    public post(url: string, args?: any): Promise<any> {
        return this.action("post", url, args);
    }

    public get(url: string, args?: any): Promise<any> {
        return this.action("get", url, args);
    }

    public put(url: string, args?: any): Promise<any> {
        return this.action("put", url, args);
    }

    public delete(url: string, args?: any): Promise<any> {
        return this.action("delete", url, args);
    }

    public action(method: string, url: string, args?: any): Promise<any> {

        const ret: Promise<any> = new Promise((resolve, reject) => {
            try {

                const actionerInfo = this.getActionerInfo(method);

                const finalArgs = this.objects.shallowCopy(this.defaultArgs);

                const argsIsGetShortForm: boolean = actionerInfo.isGet && (args === undefined ||
                    (!args.parameters && !args.headers));
                const argsIsNotGetShortForm: boolean = !actionerInfo.isGet && (args === undefined ||
                    (!args.data && !args.headers));

                const argsMustBeMap: boolean = argsIsGetShortForm || argsIsNotGetShortForm;

                if (argsMustBeMap) {
                    if (args === undefined) {
                        args = {};
                    }

                    if (!(args instanceof Object)) {
                        reject("Incorrect type of args");
                        return;
                    }

                    const keys: Array<any> = Reflect.ownKeys(args);

                    if (argsIsGetShortForm) {

                        for (const key of keys) {
                            finalArgs.parameters[key] = args[key];
                        }
                    } else if (argsIsNotGetShortForm) {

                        for (const key of keys) {
                            finalArgs.data[key] = args[key];
                        }
                    }
                    args = this.objects.shallowCopy(finalArgs);
                }

                actionerInfo.actioner(url, args, (data, response) => {
                    if (response.statusCode !== 200) {
                        const msgError: string = "Error Code" + response.statusCode + " : " + response.statusMessage;
                        console.error(msgError, data);
                        reject(new Error(msgError));
                        return;
                    }
                    resolve({ data, response });
                });
            } catch (e) {
                reject(e);
            }
        });
        return ret;
    }

    private getActionerInfo(method: string): any {
        let actioner = this.client.get;
        let isGet: boolean = true;

        if (method === "post") {
            actioner = this.client.post;
            isGet = false;
        } else if (method === "put") {
            actioner = this.client.put;
            isGet = false;
        } else if (method === "delete") {
            actioner = this.client.delete;
            isGet = false;
        }

        return { isGet, actioner };
    }
}
