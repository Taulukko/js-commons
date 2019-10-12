import { Cache } from "./cache";

describe("Cache tests", () => {
    beforeEach(() => {
        jest.setTimeout(5000);
    });

    test("Set and Get", () => {
        const cache: Cache = new Cache();

        cache.set("age", 35);
        cache.set("name", "Xisto");
        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);
        expect(cache.get("name")).toBe("Xisto");
        expect(cache.get("wrong")).toBe(undefined);
    });

    test("Set and Get using TTL", async () => {

        const cache: Cache = new Cache();

        const buildPromisse: () => Promise<boolean> = () => new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 1100);
        });

        cache.set("age", 35, 1000);

        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);

        const result = await buildPromisse();

        expect(result).toBeTruthy();

        expect(cache.get("age")).not.toBe(35);
    });

    test("Set, Get And Del", () => {
        const cache: Cache = new Cache();

        cache.set("age", 35);

        expect(cache.get("age")).toBe(35);

        cache.del("age");

        expect(cache.get("age")).not.toBe(35);

    });

    test("TTL operations", async () => {

        const cache: Cache = new Cache();

        const buildPromisse: () => Promise<boolean> = () => new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 1100);
        });

        cache.set("age", 35, 1000);

        expect(cache.ttl("age")).toBeGreaterThan(0);
        cache.ttl("age", 2000);
        expect(cache.ttl("age")).toBeGreaterThan(1000);

        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);

        let result = await buildPromisse();

        expect(result).toBeTruthy();
        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);

        result = await buildPromisse();

        expect(result).toBeTruthy();

        expect(cache.get("age")).not.toBe(35);
    });

});
