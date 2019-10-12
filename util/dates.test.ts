import { DatesUtil as DatesUtilLib} from "./dates";

const DatesUtil:DatesUtilLib = new DatesUtilLib();

// into javascript months use range [0-11]
const JAVASCRIPT_MONTHS = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
};

test("Parse date", () => {
    expect(DatesUtil.parseYYYYMMDD("20191229")).toEqual(new Date(2019, JAVASCRIPT_MONTHS.DEC, 29));
    expect(DatesUtil.parseYYYYMMDD("20192429")).toEqual(new Date(2020, JAVASCRIPT_MONTHS.DEC, 29));
    expect(DatesUtil.parseYYYYMMDD("20191232")).toEqual(new Date(2020, JAVASCRIPT_MONTHS.JAN, 1));
    expect(() => { DatesUtil.parseYYYYMMDD(""); }).toThrowError("Date format YYYYMMDD incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDD("201912"); }).toThrowError("Date format YYYYMMDD incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDD("201912012200"); }).toThrowError("Date format YYYYMMDD incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDD("ABCD1229"); }).toThrowError("Year must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDD("2019AB29"); }).toThrowError("Month must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDD("201919AB"); }).toThrowError("Day must be numeric integer");
});

test("Get day", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getDay(date)).toBe(29);
    expect(DatesUtil.getDay(nextYear)).toBe(1);
});

test("Get day of weak index", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.JUL, 24);
    expect(DatesUtil.getDayOfWeakIndex(date)).toBe(3);
});

test("Get day of weak", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.JUL, 24);
    expect(DatesUtil.getDayOfWeak(date)).toBe(4);
});

test("Get month", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getMonth(date)).toBe(12);
    expect(DatesUtil.getMonth(nextYear)).toBe(1);
});

test("Get month index", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getMonthIndex(date)).toBe(11);
    expect(DatesUtil.getMonthIndex(nextYear)).toBe(0);
});

test("Get year", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getYear(date)).toBe(2019);
    expect(DatesUtil.getYear(nextYear)).toBe(2020);
});

test("Add days ", () => {
    const date: Date = DatesUtil.parse(1990, 5, 1);

    const expectedMajor: Date = DatesUtil.parse(1990, 5, 31);

    const expectedMinor: Date = DatesUtil.parse(1990, 4, 1);

    const expectedBirthDay: Date = DatesUtil.parse(1991, 5, 1);

    expect(DatesUtil.addDays(date, 0)).toEqual(date);
    expect(DatesUtil.addDays(date, 30)).toEqual(expectedMajor);
    expect(DatesUtil.addDays(date, -30)).toEqual(expectedMinor);
    expect(DatesUtil.addDays(date, 365)).toEqual(expectedBirthDay);
});
