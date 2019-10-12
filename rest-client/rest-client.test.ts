import { RestClient } from "./rest-client";

describe("RestClient tests", () => {

    const client: RestClient = new RestClient();

    function convertToEmpty(data) {
        let ret = data;
        if (data === null || data === undefined) {
            ret = {};
        }
        return ret;
    }

    beforeEach(() => {
        jest.setTimeout(10000);
    });

    test("Post test using complete args ", async () => {

        const argsBase = {
            data: { age: 33 },
            headers: { "Content-Type": "application/json" },
            parameters: { name: "wrong" },
        };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.post("https://postman-echo.com/post", argsBase);
        const urlReturn = restClientReturn.data;

        expect(urlReturn.data).toEqual(argsBase.data);
        expect(urlReturn.args).toEqual(argsBase.parameters);
    });

    test("Put test using complete args ", async () => {

        const argsBase = {
            data: { age: 33 },
            headers: { "Content-Type": "application/json" },
            parameters: { name: "wrong" },
        };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.put("https://postman-echo.com/put", argsBase);
        const urlReturn = restClientReturn.data;

        expect(urlReturn.data).toEqual(argsBase.data);
        expect(urlReturn.args).toEqual(argsBase.parameters);
    });

    test("Delete test using complete args ", async () => {

        const argsBase = {
            data: { age: 33 },
            headers: { "Content-Type": "application/json" },
            parameters: { name: "wrong" },
        };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.delete("https://postman-echo.com/delete", argsBase);
        const urlReturn = restClientReturn.data;

        expect(urlReturn.data).toEqual(argsBase.data);
        expect(urlReturn.args).toEqual(argsBase.parameters);
    });

    test("Get test using complete args", async () => {

        const argsBase = {
            headers: { "Content-Type": "application/json" },
            parameters: { age: "33", name: "wrong" },
        };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.get("https://postman-echo.com/get", argsBase);
        const urlReturn = restClientReturn.data;

        expect(convertToEmpty(urlReturn.data)).toEqual({});
        expect(urlReturn.args).toEqual(argsBase.parameters);
    });

    test("Post test using default args ", async () => {

        const argsBase = { age: 33 };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.post("https://postman-echo.com/post", argsBase);
        const urlReturn = restClientReturn.data;

        expect(urlReturn.data).toEqual(argsBase);
        expect(convertToEmpty(urlReturn.args)).toEqual({});
    });

    test("Put test using default args ", async () => {

        const argsBase = { age: 33 };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.put("https://postman-echo.com/put", argsBase);
        const urlReturn = restClientReturn.data;

        expect(urlReturn.data).toEqual(argsBase);
        expect(convertToEmpty(urlReturn.args)).toEqual({});

    });

    test("Delete test using default args ", async () => {

        const argsBase = { age: 33 };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.delete("https://postman-echo.com/delete", argsBase);
        const urlReturn = restClientReturn.data;

        expect(urlReturn.data).toEqual(argsBase);
        expect(convertToEmpty(urlReturn.args)).toEqual({});
    });

    test("Get test using default args", async () => {

        const argsBase = { age: "33", name: "wrong" };

        // see https://postman-echo.com/ for documentation
        const restClientReturn = await client.get("https://postman-echo.com/get", argsBase);
        const urlReturn = restClientReturn.data;

        expect(convertToEmpty(urlReturn.data)).toEqual({});
        expect(urlReturn.args).toEqual(argsBase);
    });

});
