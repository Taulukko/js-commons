class StringsUtil {

    public left(str: string, n: number): string {
        if (n <= 0) {
            return "";
        } else if (n > str.length) {
            return str;
        } else {
            return str.substring(0, n);
        }
    }

    public trim(str: string): string {
        return str.replace(/^\s*|\s*$/g, "");
    }

    public right(str: string, n: number): string {
        if (n <= 0) {
            return "";
        } else if (n > str.length) {
            return str;
        } else {
            const iLen: number = str.length;
            return str.substring(iLen, iLen - n);
        }
    }

    public repeat(str: string, n: number, separator: string): string {
        let ret = "";

        for (let index = 0; index < n; index++) {
            if (index > 0) {
                ret += separator;
            }
            ret += str;
        }

        return ret;
    }

    public leftPadding(str: string, n: number, paddingValue: string): string {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str = emptyBlock + str;
        return this.right(str, n);
    }

    public rightPadding(str: string, n: number, paddingValue: string): string {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str += emptyBlock;
        return this.left(str, n);
    }

    public count(str: string, find: string): number {
        const arr: Array<string> = str.split(find);
        return arr.length - 1;
    }

    public hashNumber(str: string): number {
        let hashCode: number = 0;
        let i: number;
        let chr: number;

        if (str.length === 0) {
            return hashCode;
        }

        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            // tslint:disable-next-line
            hashCode = ((hashCode << 5) - hashCode) + chr;
            // tslint:disable-next-line
            hashCode |= 0; // Convert to 32bit integer
        }

        return hashCode;
    }

    public hashString(str: string): string {
        return this.hashNumber(str).toString(36);
    }

}

export { StringsUtil };
