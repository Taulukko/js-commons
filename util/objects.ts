class ObjectsUtil {

    public shallowCopy(data: any): any {
        return JSON.parse(JSON.stringify(data));
    }

    public partialCopy(from: any, to: any, fields: Array<string>): any {
        const ret: any = this.shallowCopy(to);

        for (const field of fields) {
            ret[field] = from[field];
        }

        return ret;
    }
}
 

export {   ObjectsUtil };
