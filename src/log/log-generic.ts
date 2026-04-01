import { DatesUtil } from "../dates";
import { injectController } from "../inject-controller/inject-controller";
import { Level, Log, LogFunction } from "./log";

export interface LogOptions {
    /**
 * String prefix to prepend to each log message.
 * @defaultValue ""
 */
    prefix: string;
    /**
 * Whether to include the timestamp in log output.
 * @defaultValue true
 */
    hasDate: boolean;
    /**
 * Whether to include the log level in square brackets in the output.
 * @defaultValue true
 */
    hasLevel: boolean;
    /**
 * Unused property (kept for backward compatibility).
 * The actual format is always: `prefix [level] date`
 */
    format: string;
}

type BuildDate = () => Date;
/**
 * Injection token key for providing a custom build date function.
 * Used to inject a custom date provider instead of the default Date constructor.
 */
export const BUILD_DATE_KEY: string = "LogGenericImpl.BuildDate";

/**
 * Internal mapping of log levels to numeric values for comparison.
 * Higher values represent more severe levels, enabling level-based filtering.
 */
const levelNumericMap: Record<Level, number> = {
    [Level.DEBUG]: 0,
    [Level.INFO]: 1,
    [Level.WARN]: 2,
    [Level.ERROR]: 3,
    [Level.CRITICAL]: 4,
};

/**
 * Generic logging implementation with dependency injection support.
 * Provides log level filtering and configurable output formatting.
 * Falls back to native console methods if no injectable functions are registered.
 * 
 * Log levels (from least to most severe): DEBUG, INFO, WARN, ERROR, CRITICAL
 * 
 * Output format: `{prefix} [{level}] {date}` (components are conditional based on options)
 */
export class LogGenericImpl implements Log {
    /**
     * Current log level threshold. Only messages at this level or higher severity are logged.
     * @defaultValue Level.INFO
     */
    #level: Level = Level.INFO;
    /**
     * Injected or fallback function for CRITICAL level logging.
     */
    readonly #critical: LogFunction;
    /**
 * Injected or fallback function for ERROR level logging.
 */
    readonly #error: LogFunction;
    /**
 * Injected or fallback function for WARN level logging.
 */
    readonly #warn: LogFunction;
    /**
 * Injected or fallback function for INFO level logging.
 */
    readonly #info: LogFunction;
    /**
 * Injected or fallback function for DEBUG level logging.
 */
    readonly #debug: LogFunction;
    /**
 * Logger configuration options.
 */
    readonly #options: LogOptions;
    /**
 * Function that provides the current date/time for log timestamps.
 * Can be injected via BUILD_DATE_KEY for custom behavior.
 * * Utility instance for date formatting operations.
 */
    readonly #buildDate: BuildDate;
    /**
 * Utility instance for date formatting operations.
 */
    readonly #dateUtil: DatesUtil = new DatesUtil();

    /**
     * Creates a new LogGenericImpl instance.
     * @param options - Configuration options for logging format. Defaults to empty prefix with date and level enabled.
     */
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
    /**
     * Gets or sets the current log level threshold.
     * When called without arguments, returns the current level.
     * When called with a level, sets it as the new threshold.
     * @param level - The log level to set (optional). If omitted, acts as getter.
     * @returns The current log level.
     */
    level(level: Level | undefined = undefined): Level {
        if (level != undefined) {
            this.#level = level;
        }
        return this.#level;
    }
    /**
     * Checks if a given log level is compatible with the current level threshold.
     * A level is compatible if its severity is greater than or equal to the current threshold.
     * @param level - The log level to check compatibility for.
     * @returns true if the level should be logged, false if it should be filtered out.
     */
    isCompatible(level: Level): boolean {
        const currentLevelValue = levelNumericMap[this.#level];
        const checkLevelValue = levelNumericMap[level];
        return checkLevelValue >= currentLevelValue;
    }

    /** 
   * Gets or sets the current log level threshold.
   * When called without arguments, returns the current level.
   * When called with a level, sets it as the new threshold.
   * @param level - The log level to set (optional). If omitted, acts as getter.
   * @returns The current log level.
   */
    private log(logFunction: LogFunction, level: Level, ...args: Array<any>): void {

        if (!this.isCompatible(level)) {
            return;
        }
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
    /**
     * Logs a critical message (highest severity level).
     * @param args - Message arguments to log.
     */
    critical(...args: Array<any>): void {
        this.log(this.#critical, Level.CRITICAL, ...args);
    }
    /**
     * Logs an error message.
     * @param args - Message arguments to log.
     */
    error(...args: Array<any>): void {
        this.log(this.#error, Level.ERROR, ...args);
    }
    /**
     * Logs a warning message.
     * @param args - Message arguments to log.
     */
    warn(...args: Array<any>): void {
        this.log(this.#warn, Level.WARN, ...args);
    }
    /**
     * Logs an informational message.
     * @param args - Message arguments to log.
     */
    info(...args: Array<any>): void {
        this.log(this.#info, Level.INFO, ...args);
    }
    /**
     * Logs a debug message (lowest severity level).
     * @param args - Message arguments to log.
     */
    debug(...args: Array<any>): void {
        this.log(this.#debug, Level.DEBUG, ...args);
    }
}
