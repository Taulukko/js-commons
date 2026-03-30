 import { StringsUtil as StringsUtilLib  } from "../strings";
 

const StringsUtil: StringsUtilLib = new StringsUtilLib();

describe("string util functions", () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });

    test("left", () => {
        expect(StringsUtil.left("", 3)).toBe("");
        expect(StringsUtil.left("", 0)).toBe("");
        expect(StringsUtil.left("teste", 3)).toBe("tes");
        expect(StringsUtil.left("teste", 10)).toBe("teste");
        expect(StringsUtil.left("teste", -1)).toBe("");
        expect(StringsUtil.left("teste", -5)).toBe("");
        expect(StringsUtil.left("", -1)).toBe("");
    });

    test("right", () => {
        expect(StringsUtil.right("", 3)).toBe("");
        expect(StringsUtil.right("", 0)).toBe("");
        expect(StringsUtil.right("teste", 3)).toBe("ste");
        expect(StringsUtil.right("teste", 10)).toBe("teste");
        expect(StringsUtil.right("teste", -1)).toBe("");
        expect(StringsUtil.right("teste", -5)).toBe("");
        expect(StringsUtil.right("", -1)).toBe("");
    });

 
    test("repeat", () => {
        expect(StringsUtil.repeat("test", 3, " ")).toBe("test test test");
        expect(StringsUtil.repeat("", 3, "x")).toBe("xx");
        expect(StringsUtil.repeat("x", 3, "")).toBe("xxx");
        expect(StringsUtil.repeat("", 3, "")).toBe("");
        expect(StringsUtil.repeat("test", 0, " ")).toBe("");
        expect(StringsUtil.repeat("test", -1, " ")).toBe("");
        expect(StringsUtil.repeat("", 0, "x")).toBe("");
        expect(StringsUtil.repeat("", -1, "x")).toBe("");
    });

    test("leftPadding", () => {
        expect(StringsUtil.leftPadding("test", 7, "x")).toBe("xxxtest");
        expect(StringsUtil.leftPadding("test", 3, "x")).toBe("est");
        expect(StringsUtil.leftPadding("", 0, "x")).toBe("");
        expect(StringsUtil.leftPadding("", -1, "x")).toBe("");
        expect(StringsUtil.leftPadding("", 3, "x")).toBe("xxx");
    });

    test("rightPadding", () => {
        expect(StringsUtil.rightPadding("test", 7, "x")).toBe("testxxx");
        expect(StringsUtil.rightPadding("test", 3, "x")).toBe("tes");
        expect(StringsUtil.rightPadding("", 0, "x")).toBe("");
        expect(StringsUtil.rightPadding("", -1, "x")).toBe("");
        expect(StringsUtil.rightPadding("", 3, "x")).toBe("xxx");
    });

    test("hashNumber", () => {
        expect(StringsUtil.hashNumber("abc")).toBe(96354);
        expect(StringsUtil.hashNumber("123")).toBe(48690);
        expect(StringsUtil.hashNumber("")).toBe(0);
        expect(StringsUtil.hashNumber(" ")).toBe(32);
        expect(StringsUtil.hashNumber("!@#$")).toBe(1045728);
        expect(StringsUtil.hashNumber("test@email.com")).toBe(-280164863);
    });

    test("hashString", () => {
        expect(StringsUtil.hashString("abc")).toBe("22ci");
        expect(StringsUtil.hashString("123")).toBe("11ki");
        expect(StringsUtil.hashString("")).toBe("0");
        expect(StringsUtil.hashString(" ")).toBe("w");
        expect(StringsUtil.hashString("!@#$")).toBe("mew0");
        expect(StringsUtil.hashString("test@email.com")).toBe("-4mswlb");
    });

    test("count", () => {
        expect(StringsUtil.count("abc@def@ghi", "@")).toBe(2);
        expect(StringsUtil.count("abc@def", "@")).toBe(1);
        expect(StringsUtil.count("abc", "@")).toBe(0);
        expect(StringsUtil.count("", "@")).toBe(0);
        expect(StringsUtil.count("@", "@")).toBe(1);
        expect(StringsUtil.count("@@", "@")).toBe(2);
        expect(StringsUtil.count("abc.def.ghi", ".")).toBe(2);
    });
});
