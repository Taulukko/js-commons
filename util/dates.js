"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatesUtil = void 0;
const strings_1 = require("./strings");
class DatesUtil {
    stringUtil = new strings_1.StringsUtil();
    addDays(date, days) {
        const ret = new Date(date);
        ret.setDate(date.getDate() + days);
        return ret;
    }
    parseYYYYMMDD(dateStr) {
        if (dateStr.length !== 8) {
            throw new Error("Date format YYYYMMDD incorrect!");
        }
        const yearStr = this.stringUtil.left(dateStr, 4);
        if (isNaN(yearStr)) {
            throw new Error("Year must be numeric integer");
        }
        const monthStr = this.stringUtil.right(this.stringUtil.left(dateStr, 6), 2);
        if (isNaN(monthStr)) {
            throw new Error("Month must be numeric integer");
        }
        const dayStr = this.stringUtil.right(dateStr, 2);
        if (isNaN(dayStr)) {
            throw new Error("Day must be numeric integer");
        }
        return this.parse(parseInt(yearStr, 10), parseInt(monthStr, 10), parseInt(dayStr, 10));
    }
    parse(year, month, day) {
        return new Date(year, month - 1, day);
    }
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return date.getMonth() + 1;
    }
    getMonthIndex(date) {
        return date.getMonth();
    }
    getDay(date) {
        return date.getDate();
    }
    getDayOfWeak(date) {
        return date.getDay() + 1;
    }
    getDayOfWeakIndex(date) {
        return date.getDay();
    }
}
exports.DatesUtil = DatesUtil;
//# sourceMappingURL=dates.js.map