import { DatesUtil } from "../dates";
import { injectController } from "../inject-controller/inject-controller";
import { Level, Log, LogFunction } from "./log";

export interface LogOptions {
    prefix: string;
    hasDate: boolean;
    hasLevel: boolean;
    format: string;
}

type BuildDate = () => Date;

export const BUILD_DATE_KEY: string = "LogGenericImpl.BuildDate";

// Helper to map Level enum to numeric values for comparison
const levelNumericMap: Record<Level, number> = {
    [Level.DEBUG]: 0,
    [Level.INFO]: 1,
    [Level.WARN]: 2,
    [Level.ERROR]: 3,
    [Level.CRITICAL]: 4,
};

/**
 * Log class generic, fail case uses console.log / error / warn ...
 * For now, this implementation ignore formatation, so always the format is prefix + "[" +  level + "] yyyyMMSSmmmHHMMSS"
 */
export class LogGenericImpl implements Log {

    #level: Level = Level.INFO;

    readonly #critical: LogFunction;
    readonly #error: LogFunction;
    readonly #warn: LogFunction;
    readonly #info: LogFunction;
    readonly #debug: LogFunction;
    readonly #options: LogOptions;
    readonly #buildDate: BuildDate;
    readonly #dateUtil: DatesUtil = new DatesUtil();


    constructor(options: LogOptions = {
        prefix: "",
        hasDate: true, // Changed default to true to match 'default options' test expectation
        hasLevel: true, // Changed default to true to match 'default options' test expectation
        format: ""
    }) {

        const prefixInjectController: string = "LogGenericImpl.";
        this.#critical = (injectController.has(prefixInjectController + Level.CRITICAL)) ? injectController.resolve(prefixInjectController + Level.CRITICAL) : console.error;
        this.#error = (injectController.has(prefixInjectController + Level.ERROR)) ? injectController.resolve(prefixInjectController + Level.ERROR) : console.error;
        this.#warn = (injectController.has(prefixInjectController + Level.WARN)) ? injectController.resolve(prefixInjectController + Level.WARN) : console.warn;
        this.#info = (injectController.has(prefixInjectController + Level.INFO)) ? injectController.resolve(prefixInjectController + Level.INFO) : console.info;
        this.#debug = (injectController.has(prefixInjectController + Level.DEBUG)) ? injectController.resolve(prefixInjectController + Level.DEBUG) : console.debug;

        this.#buildDate = (injectController.has(BUILD_DATE_KEY)) ? injectController.resolve(BUILD_DATE_KEY) : () => new Date();

        this.#options = options;
    }

    level(level: Level | undefined = undefined): Level {
        if (level != undefined) {
            this.#level = level;
        }
        return this.#level;
    }

    isCompatible(level: Level): boolean {
        const currentLevelValue = levelNumericMap[this.#level];
        const checkLevelValue = levelNumericMap[level];
        return checkLevelValue >= currentLevelValue;
    }

    // Refactored log method to conditionally include parts based on options
    private log(logFunction: LogFunction, level: Level, ...args: Array<any>): void {
        const dateString = this.#dateUtil.toString(this.#buildDate(), 14);
        const messageParts: string[] = [];

        // Add prefix if it's not empty
        if (this.#options.prefix) {
            messageParts.push(this.#options.prefix);
        }

        // Add level if enabled
        if (this.#options.hasLevel) {
            messageParts.push(`[${level}]`);
        }

        // Add date if enabled
        if (this.#options.hasDate) {
            messageParts.push(dateString);
        }

        // Join parts with a space. If only message parts are present, join them.
        // If there are no parts, it means only the message is logged.
        const constructedPrefix = messageParts.join(" ");

        // Log function expects prefix and then the actual message arguments
        if (constructedPrefix) {
            logFunction(constructedPrefix, ...args);
        } else {
            // If no prefix parts were added (e.g., empty prefix, hasDate: false, hasLevel: false)
            // just log the arguments.
            logFunction(...args);
        }
    }

    critical(...args: Array<any>): void {
        this.log(this.#critical,Level.CRITICAL, ...args);
    }

    error(...args: Array<any>): void {
        this.log(this.#error,Level.ERROR, ...args);
    }

    warn(...args: Array<any>): void {
        this.log(this.#warn,Level.WARN, ...args);
    }

    info(...args: Array<any>): void {
        this.log(this.#info,Level.INFO, ...args);
    }

    debug(...args: Array<any>): void {
        this.log(this.#debug,Level.DEBUG, ...args);
    }
}
