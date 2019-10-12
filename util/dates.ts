import { StringsUtil } from "./strings";

class DatesUtil {

    public addDays(date: Date, days: number): Date {
        const ret: Date = new Date(date);
        ret.setDate(date.getDate() + days);
        return ret;
    }

    public parseYYYYMMDD(dateStr: string): Date {
        if (dateStr.length !== 8) {
            throw new Error("Date format YYYYMMDD incorrect!");
        }

        const yearStr: string = StringsUtil.left(dateStr, 4);

        if (isNaN(yearStr as any)) {
            throw new Error("Year must be numeric integer");
        }

        const monthStr: string = StringsUtil.right(StringsUtil.left(dateStr, 6), 2);

        if (isNaN(monthStr as any)) {
            throw new Error("Month must be numeric integer");
        }

        const dayStr: string = StringsUtil.right(dateStr, 2);

        if (isNaN(dayStr as any)) {
            throw new Error("Day must be numeric integer");
        }

        return this.parse(parseInt(yearStr, 10), parseInt(monthStr, 10), parseInt(dayStr, 10));
    }

    public parse(year: number, month: number, day: number) {
        return new Date(year, month - 1, day);
    }

    public getYear(date: Date): number {
        return date.getFullYear();
    }

    public getMonth(date: Date): number {
        return date.getMonth() + 1;
    }

    public getMonthIndex(date: Date): number {
        return date.getMonth();
    }

    public getDay(date: Date): number {
        return date.getDate();
    }

    public getDayOfWeak(date: Date): number {
        return date.getDay() + 1;
    }

    public getDayOfWeakIndex(date: Date): number {
        return date.getDay();
    }

}

const dtUtil: DatesUtil = new DatesUtil();

export { dtUtil as DatesUtil };
