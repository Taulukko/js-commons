/**
 * Utility class for string manipulation operations.
 */
class StringsUtil {

    /**
     * Returns the first n characters from the left side of the string.
     * 
     * @param str - The string to extract characters from.
     * @param n - The number of characters to extract.
     * @returns A string containing the leftmost n characters. Returns an empty string if n <= 0.
     */
    public left(str: string, n: number): string {
        if (n <= 0) {
            return "";
        } else if (n > str.length) {
            return str;
        } else {
            return str.substring(0, n);
        }
    }

    /**
     * Removes whitespace from both ends of a string.
     * 
     * @deprecated Use the native {@link String.prototype.trim} method instead.
     * @param str - The string to trim.
     * @returns The trimmed string.
     */
    public trim(str: string): string {
        return str.trim();
    }

    /**
     * Returns the last n characters from the right side of the string.
     * 
     * @param str - The string to extract characters from.
     * @param n - The number of characters to extract.
     * @returns A string containing the rightmost n characters. Returns an empty string if n <= 0.
     */
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

    /**
     * Repeats a string n times, joined by a separator.
     * 
     * @param str - The string to repeat.
     * @param n - The number of times to repeat the string.
     * @param separator - The string to use as a separator between repetitions.
     * @returns The repeated and joined string. Returns an empty string if n <= 0.
     */
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

    /**
     * Pads the string on the left with a specified padding value until it reaches the desired length.
     * If the string is already longer than n, it will be truncated from the left (keeping the rightmost n characters).
     * 
     * @param str - The string to pad.
     * @param n - The target length of the resulting string.
     * @param paddingValue - The value to use for padding.
     * @returns The padded (or truncated) string.
     */
    public leftPadding(str: string, n: number, paddingValue: string): string {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str = emptyBlock + str;
        return this.right(str, n);
    }

    /**
     * Pads the string on the right with a specified padding value until it reaches the desired length.
     * If the string is already longer than n, it will be truncated from the right (keeping the leftmost n characters).
     * 
     * @param str - The string to pad.
     * @param n - The target length of the resulting string.
     * @param paddingValue - The value to use for padding.
     * @returns The padded (or truncated) string.
     */
    public rightPadding(str: string, n: number, paddingValue: string): string {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str += emptyBlock;
        return this.left(str, n);
    }

    /**
     * Counts the number of occurrences of a substring within a string.
     * 
     * @param str - The string to search within.
     * @param find - The substring to search for.
     * @returns The number of times the substring occurs in the string.
     */
    public count(str: string, find: string): number {
        const arr: Array<string> = str.split(find);
        return arr.length - 1;
    }

    /**
     * Generates a numeric hash code for the given string.
     * 
     * @param str - The string to hash.
     * @returns A 32-bit integer representing the hash of the string.
     */
    public hashNumber(str: string): number {
        let hashCode: number = 0;
        let i: number;
        let chr: number;

        if (str.length === 0) {
            return hashCode;
        }

        for (i = 0; i < str.length; i++) {
            chr = str.codePointAt(i);
            hashCode = ((hashCode << 5) - hashCode) + chr;
            hashCode |= 0;
        }

        return hashCode;
    }

    /**
     * Generates a string-based hash code for the given string, represented in base 36.
     * 
     * @param str - The string to hash.
     * @returns A base-36 string representation of the numeric hash.
     */
    public hashString(str: string): string {
        return this.hashNumber(str).toString(36);
    }

}

export { StringsUtil };
