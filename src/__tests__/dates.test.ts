import { DatesUtil as DatesUtilLib } from "../dates";

const DatesUtil: DatesUtilLib = new DatesUtilLib();

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

test("Parse date YYYYMMDDHHMMSS", () => {
    const expectedDate: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29, 14, 30, 15);
    expect(DatesUtil.parseYYYYMMDDHHMMSS("20191229143015")).toEqual(expectedDate);
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("20191229"); }).toThrowError("Date format YYYYMMDDHHMMSS incorrect!");
});

test("toString limit size", () => {
    const date: Date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29, 14, 30, 15);
    expect(DatesUtil.toString(date)).toBe("20191229143015");
    expect(DatesUtil.toString(date, 4)).toBe("2019");
    expect(DatesUtil.toString(date, 8)).toBe("20191229");
    expect(DatesUtil.toString(date, -1)).toBe("");
    expect(DatesUtil.toString(date, 20)).toBe("20191229143015");
});

test("parse with hour/minute/second", () => {
    const date1: Date = DatesUtil.parse(1990, 5, 1);
    expect(date1.getFullYear()).toBe(1990);
    expect(date1.getMonth()).toBe(4); // JavaScript months: 0-11
    expect(date1.getDate()).toBe(1);
    expect(date1.getHours()).toBe(0);
    expect(date1.getMinutes()).toBe(0);
    expect(date1.getSeconds()).toBe(0);

    const date2: Date = DatesUtil.parse(1990, 5, 1, 14, 30, 15);
    expect(date2.getFullYear()).toBe(1990);
    expect(date2.getMonth()).toBe(4);
    expect(date2.getDate()).toBe(1);
    expect(date2.getHours()).toBe(14);
    expect(date2.getMinutes()).toBe(30);
    expect(date2.getSeconds()).toBe(15);

    const date3: Date = DatesUtil.parse(2023, 12, 31, 23, 59, 59);
    expect(date3.getFullYear()).toBe(2023);
    expect(date3.getMonth()).toBe(11);
    expect(date3.getDate()).toBe(31);
    expect(date3.getHours()).toBe(23);
    expect(date3.getMinutes()).toBe(59);
    expect(date3.getSeconds()).toBe(59);
});

test("parseYYYYMMDDHHMMSS with invalid data", () => {
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS(""); }).toThrowError("Date format YYYYMMDDHHMMSS incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("20191229"); }).toThrowError("Date format YYYYMMDDHHMMSS incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("201912291430"); }).toThrowError("Date format YYYYMMDDHHMMSS incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("201912291430150"); }).toThrowError("Date format YYYYMMDDHHMMSS incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("ABCD1229143015"); }).toThrowError("Year must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("2019ABCD143015"); }).toThrowError("Month must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("201912AB143015"); }).toThrowError("Day must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("20191229AB3015"); }).toThrowError("Time must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("2019122914AB15"); }).toThrowError("Time must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSS("201912291430AB"); }).toThrowError("Time must be numeric integer");
});

test("toString edge cases", () => {
    const date: Date = new Date(2023, JAVASCRIPT_MONTHS.JAN, 1, 0, 0, 0);
    expect(DatesUtil.toString(date, 0)).toBe("");
    expect(DatesUtil.toString(date, 1)).toBe("2");
    expect(DatesUtil.toString(date, 2)).toBe("20");
    expect(DatesUtil.toString(date, 3)).toBe("202");
    expect(DatesUtil.toString(date, 4)).toBe("2023");
    expect(DatesUtil.toString(date, 5)).toBe("20230");
    expect(DatesUtil.toString(date, 6)).toBe("202301");
    expect(DatesUtil.toString(date, 7)).toBe("2023010");
    expect(DatesUtil.toString(date, 8)).toBe("20230101");
    expect(DatesUtil.toString(date, 9)).toBe("202301010");
    expect(DatesUtil.toString(date, 10)).toBe("2023010100");
    expect(DatesUtil.toString(date, 11)).toBe("20230101000");
    expect(DatesUtil.toString(date, 12)).toBe("202301010000");
    expect(DatesUtil.toString(date, 13)).toBe("2023010100000");
    expect(DatesUtil.toString(date, 14)).toBe("20230101000000");
    expect(DatesUtil.toString(date, 15)).toBe("20230101000000");
});

test("addDays edge cases", () => {
    const date: Date = DatesUtil.parse(2023, 1, 1);
    
    // Test large positive days
    expect(DatesUtil.addDays(date, 365)).toEqual(DatesUtil.parse(2024, 1, 1));
    expect(DatesUtil.addDays(date, 731)).toEqual(DatesUtil.parse(2025, 1, 1)); // 2024 is leap year (366 days)
    
    // Test large negative days
    expect(DatesUtil.addDays(date, -365)).toEqual(DatesUtil.parse(2022, 1, 1));
    expect(DatesUtil.addDays(date, -730)).toEqual(DatesUtil.parse(2021, 1, 1));
    
    // Test month boundaries
    const endOfMonth: Date = DatesUtil.parse(2023, 1, 31);
    expect(DatesUtil.addDays(endOfMonth, 1)).toEqual(DatesUtil.parse(2023, 2, 1));
    
    const startOfMonth: Date = DatesUtil.parse(2023, 2, 1);
    expect(DatesUtil.addDays(startOfMonth, -1)).toEqual(DatesUtil.parse(2023, 1, 31));
    
    // Test leap year
    const leapDay: Date = DatesUtil.parse(2024, 2, 28);
    expect(DatesUtil.addDays(leapDay, 1)).toEqual(DatesUtil.parse(2024, 2, 29));
    expect(DatesUtil.addDays(leapDay, 2)).toEqual(DatesUtil.parse(2024, 3, 1));
});
