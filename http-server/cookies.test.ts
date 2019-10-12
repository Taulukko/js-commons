import { CookiesUtil } from "./cookies";
describe("CookiesUtil", () => {
    beforeEach(() => {
        jest.setTimeout(5000);
    });

    test("val", () => {

        const basicCookies = "name1=value1;name2=value2";
        const emptyCookies1 = "name1=;name2=value2";
        const emptyCookies2 = "name1=value1;name2=";
        const emptyCookies3 = "name1=;name2=";
        const badCookies1 = "";
        const badCookies2 = "=;=";
        const badCookies3 = ";";

        let cookies = new CookiesUtil(basicCookies);

        expect(cookies.val("name1")).toBe("value1");
        expect(cookies.val("name2")).toBe("value2");
        expect(cookies.val("name3")).toBe(undefined);

        expect(cookies.val("name1")).toBe("value1");
        expect(cookies.val("name2")).toBe("value2");
        expect(cookies.val("name3")).toBe(undefined);

        cookies = new CookiesUtil(emptyCookies1);

        expect(cookies.val("name1")).toBe("");
        expect(cookies.val("name2")).toBe("value2");
        expect(cookies.val("name3")).toBe(undefined);

        cookies = new CookiesUtil(emptyCookies2);

        expect(cookies.val("name1")).toBe("value1");
        expect(cookies.val("name2")).toBe("");
        expect(cookies.val("name3")).toBe(undefined);

        cookies = new CookiesUtil(emptyCookies3);

        expect(cookies.val("name1")).toBe("");
        expect(cookies.val("name2")).toBe("");
        expect(cookies.val("name3")).toBe(undefined);

        cookies = new CookiesUtil(badCookies1);

        expect(cookies.val("name1")).toBe(undefined);
        expect(cookies.val("name2")).toBe(undefined);
        expect(cookies.val("name3")).toBe(undefined);

        cookies = new CookiesUtil(badCookies2);

        expect(cookies.val("name1")).toBe(undefined);
        expect(cookies.val("name2")).toBe(undefined);
        expect(cookies.val("name3")).toBe(undefined);

        cookies = new CookiesUtil(badCookies3);

        expect(cookies.val("name1")).toBe(undefined);
        expect(cookies.val("name2")).toBe(undefined);
        expect(cookies.val("name3")).toBe(undefined);

    });

    test("put", () => {
        const cookies = new CookiesUtil("");

        cookies.put("name1", "value1");
        cookies.put("name2", "value2");

        expect(cookies.val("name1")).toBe("value1");
        expect(cookies.val("name2")).toBe("value2");
        expect(cookies.val("name3")).toBe(undefined);
    });

    test("has", () => {
        const cookies = new CookiesUtil("");

        cookies.put("name1", "value1");
        cookies.put("name2", "value2");

        expect(cookies.has("name1")).toBeTruthy();
        expect(cookies.has("name2")).toBeTruthy();
        expect(cookies.has("name3")).toBeFalsy();
    });

    test("toString", () => {
        let cookies = new CookiesUtil("");

        cookies.put("name1", "value1");
        cookies.put("name2", "value2");

        expect(cookies.toString()).toBe("name1=value1;name2=value2");

        cookies = new CookiesUtil();

        cookies.put("name1", "value1");
        cookies.put("name2", "value2");

        expect(cookies.toString()).toBe("name1=value1;name2=value2");
    });

});
