import { ObjectsUtil as ObjectsLib } from "./objects";

const ObjectsUtil: ObjectsLib = new ObjectsLib();

test("shallowCopy from a simple object ", () => {
    expect(ObjectsUtil.shallowCopy("")).toBe("");
    expect(ObjectsUtil.shallowCopy("test")).toBe("test");
    expect(ObjectsUtil.shallowCopy(5)).toBe(5);
    const now: Date = new Date();
    expect(new Date(ObjectsUtil.shallowCopy(now))).toEqual(now);
    expect(ObjectsUtil.shallowCopy([1, 2, 3])).toEqual([1, 2, 3]);
    expect(ObjectsUtil.shallowCopy(["1", "2", "3"])).toEqual(["1", "2", "3"]);
});

test("shallowCopy from a shallow object ", () => {
    expect(ObjectsUtil.shallowCopy({
        a: "a",
        b: 2,
        c: [1, 2, 3],
        d: ["1", "2", "3"],
    })).toEqual({
        a: "a",
        b: 2,
        c: [1, 2, 3],
        d: ["1", "2", "3"],
    });
});

test("shallowCopy from a deep object ", () => {
    expect(ObjectsUtil.shallowCopy({
        a: "a",
        b: 2,
        c: [1, 2, 3],
        d: ["1", "2", "3"],
        e: { a: 1, b: "2" },
    })).toEqual({
        a: "a",
        b: 2,
        c: [1, 2, 3],
        d: ["1", "2", "3"],
        e: { a: 1, b: "2" },
    });
});

test("partialCopy object, normal case ", () => {
    let from: any = { age: 35, name: "Chian", address: "Street V" };
    let to: any = { weight: 33 };
    expect(ObjectsUtil.partialCopy(from, to, ["age", "address"])).toEqual({
        age: 35,
        address: "Street V",
        weight: 33,
    });

    from = { age: 35, name: "Chian", address: "Street V" };
    to = { weight: 33 };
    expect(ObjectsUtil.partialCopy(from, to, ["age", "height"])).toEqual({
        age: 35,
        weight: 33,
        height: undefined,
    });

    from = { age: 35, name: "Chian", address: "Street V" };
    to = {};
    expect(ObjectsUtil.partialCopy(from, to, ["age", "height"])).toEqual({
        age: 35,
    });

    from = {};
    to = { weight: 33 };
    expect(ObjectsUtil.partialCopy(from, to, ["age", "height"])).toEqual({
        weight: 33,
    });

});

test("partialCopy object, polution case ", () => {
    const from: any = { age: 35, name: "Chian", address: "Street V" };
    const to: any = { weight: 33 };
    expect(ObjectsUtil.partialCopy(from, to, ["age", "address"])).toEqual({
        age: 35,
        address: "Street V",
        weight: 33,
    });
    expect(ObjectsUtil.partialCopy(from, to, ["age", "height"])).toEqual({
        age: 35,
        weight: 33,
        height: undefined,
    });

});

test("partialCopy object, empty case ", () => {

    let from: any = { age: 35, name: "Chian", address: "Street V" };
    let to: any = {};
    expect(ObjectsUtil.partialCopy(from, to, ["age", "height"])).toEqual({
        age: 35,
    });

    from = {};
    to = { weight: 33 };
    expect(ObjectsUtil.partialCopy(from, to, ["age", "height"])).toEqual({
        weight: 33,
    });

});
