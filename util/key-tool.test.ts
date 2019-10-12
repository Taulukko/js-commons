import { KeyTool } from "./key-tool";

/*async test
 test("[GET] /", async () => {
  const res = await req(server).get("/");
  expect(res.text).toBe("Hello ts-node!");
});

*/

const keyTool: KeyTool = new KeyTool();

const key: string = keyTool.build(1, 1);

test(`build testing key: ${key}`, () => {
    expect(key.length).toBe(53);
});

test(`build testing unique key`, () => {

    const keys: Set<string> = new Set();

    for (let i: number = 0; i < 50; i++) {

        const k11: string = keyTool.build(1, 1);
        const k12: string = keyTool.build(1, 2);
        const k21: string = keyTool.build(2, 1);
        const k22: string = keyTool.build(2, 2);

        expect(keys.has(k11)).toBe(false);
        expect(keys.has(k12)).toBe(false);
        expect(keys.has(k21)).toBe(false);
        expect(keys.has(k22)).toBe(false);

        keys.add(k11);
        keys.add(k12);
        keys.add(k21);
        keys.add(k22);
    }
});
