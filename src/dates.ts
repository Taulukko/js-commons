import { StringsUtil } from "./strings";

class DatesUtil {

    private readonly stringUtil: StringsUtil = new StringsUtil();

    public addDays(date: Date, days: number): Date {
        const ret: Date = new Date(date);
        ret.setDate(date.getDate() + days);
        return ret;
    }

    public parseYYYYMMDDHHMMSS(dateStr: string): Date {
        if (dateStr.length !== 14) {
            throw new Error("Date format YYYYMMDDHHMMSS incorrect!");
        }

        const time: string = this.stringUtil.right(dateStr, 6);

        if (isNaN(Number(time))) {
            throw new Error("Time must be numeric integer");
        }

        const hour: string = this.stringUtil.left(time, 2);

        if (isNaN(Number(hour))) {
            throw new Error("Hour must be numeric integer");
        }

        const minute: string = this.stringUtil.left(this.stringUtil.right(time, 4),2);

        if (isNaN(Number(minute))) {
            throw new Error("Minute must be numeric integer");
        }

        const second: string =  this.stringUtil.right(time, 2);

        if (isNaN(Number(second))) {
            throw new Error("Second must be numeric integer");
        }

        const date = this.parseYYYYMMDD(this.stringUtil.left(dateStr,8));
        date.setHours(Number.parseInt(hour,10));
        date.setMinutes(Number.parseInt(minute,10));
        date.setSeconds(Number.parseInt(second,10));

        return date;

    }

    public parseYYYYMMDD(dateStr: string): Date {
        if (dateStr.length !== 8) {
            throw new Error("Date format YYYYMMDD incorrect!");
        }

        const yearStr: string = this.stringUtil.left(dateStr, 4);

        if (isNaN(Number(yearStr))) {
            throw new Error("Year must be numeric integer");
        }

        const monthStr: string = this.stringUtil.right(this.stringUtil.left(dateStr, 6), 2);

        if (isNaN(Number(monthStr))) {
            throw new Error("Month must be numeric integer");
        }

        const dayStr: string = this.stringUtil.right(dateStr, 2);

        if (isNaN(Number(dayStr))) {
            throw new Error("Day must be numeric integer");
        }

        return this.parse(Number.parseInt(yearStr, 10), Number.parseInt(monthStr, 10), Number.parseInt(dayStr, 10));
    }

    public parse(year: number, month: number, day: number, hour:number=0,minute:number=0, second:number=0) {
        return new Date(year, month - 1, day, hour, minute, second);
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

    public toString(date: Date, size: number = 14): string {
        if (size < 1) {
            return "";
        }
        if (size > 14) {
            size = 14;
        }

        const year = date.getFullYear().toString().padStart(4, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        const fullStr = `${year}${month}${day}${hours}${minutes}${seconds}`;
        return this.stringUtil.left(fullStr, size);
    }

}

export { DatesUtil };
