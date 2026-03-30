import { Level, Log, LogGenericImpl, LogOptions, BUILD_DATE_KEY } from "../log";
import { injectController } from "../inject-controller/inject-controller";
import { DatesUtil } from "../dates";

describe("LogGenericImpl full tests", () => {
  let capturedMessages: Map<Level, string[]> = new Map();
  let mockBuildDate: Date;

  const createMockLogFunction = (level: Level) => (...args: Array<any>) => {
    if (!capturedMessages.has(level)) {
      capturedMessages.set(level, []);
    }
    capturedMessages.get(level)!.push(args.join(" "));
  };

  beforeEach(() => {
    capturedMessages.clear();
    injectController.clearAll();

    const prefixInjectController = "LogGenericImpl.";
    
    injectController.registerByName(prefixInjectController + Level.CRITICAL, createMockLogFunction(Level.CRITICAL));
    injectController.registerByName(prefixInjectController + Level.ERROR, createMockLogFunction(Level.ERROR));
    injectController.registerByName(prefixInjectController + Level.WARN, createMockLogFunction(Level.WARN));
    injectController.registerByName(prefixInjectController + Level.INFO, createMockLogFunction(Level.INFO));
    injectController.registerByName(prefixInjectController + Level.DEBUG, createMockLogFunction(Level.DEBUG));

    mockBuildDate = new DatesUtil().parseYYYYMMDDHHMMSS("20231225143015");
    injectController.registerByName(BUILD_DATE_KEY, () => mockBuildDate);
  });

  test("level() getter and setter", () => {
    const logger = new LogGenericImpl();

    expect(logger.level(undefined)).toBe(Level.INFO);

    expect(logger.level(Level.CRITICAL)).toBe(Level.CRITICAL);
    expect(logger.level(undefined)).toBe(Level.CRITICAL);

    expect(logger.level(Level.ERROR)).toBe(Level.ERROR);
    expect(logger.level(undefined)).toBe(Level.ERROR);

    expect(logger.level(Level.WARN)).toBe(Level.WARN);
    expect(logger.level(undefined)).toBe(Level.WARN);

    expect(logger.level(Level.DEBUG)).toBe(Level.DEBUG);
    expect(logger.level(undefined)).toBe(Level.DEBUG);
    });

    // Added explicit test for getter with no arguments for documentation clarity
    test("level() getter (no args)", () => {
        const logger = new LogGenericImpl();
        // Initially, it should be INFO by default
        expect(logger.level()).toBe(Level.INFO);
        expect(logger.level(undefined)).toBe(Level.INFO);

        // Set a level and check if it's retrieved correctly
        logger.level(Level.DEBUG);
        expect(logger.level(undefined)).toBe(Level.DEBUG);
    });

  test("isCompatible() with CRITICAL level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.CRITICAL);

    expect(logger.isCompatible(Level.CRITICAL)).toBe(true);
    expect(logger.isCompatible(Level.ERROR)).toBe(false);
    expect(logger.isCompatible(Level.WARN)).toBe(false);
    expect(logger.isCompatible(Level.INFO)).toBe(false);
    expect(logger.isCompatible(Level.DEBUG)).toBe(false);
  });

  test("isCompatible() with ERROR level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.ERROR);

    expect(logger.isCompatible(Level.CRITICAL)).toBe(true);
    expect(logger.isCompatible(Level.ERROR)).toBe(true);
    expect(logger.isCompatible(Level.WARN)).toBe(false);
    expect(logger.isCompatible(Level.INFO)).toBe(false);
    expect(logger.isCompatible(Level.DEBUG)).toBe(false);
  });

  test("isCompatible() with WARN level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.WARN);

    expect(logger.isCompatible(Level.CRITICAL)).toBe(true);
    expect(logger.isCompatible(Level.ERROR)).toBe(true);
    expect(logger.isCompatible(Level.WARN)).toBe(true);
    expect(logger.isCompatible(Level.INFO)).toBe(false);
    expect(logger.isCompatible(Level.DEBUG)).toBe(false);
  });

  test("isCompatible() with INFO level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.INFO);

    expect(logger.isCompatible(Level.CRITICAL)).toBe(true);
    expect(logger.isCompatible(Level.ERROR)).toBe(true);
    expect(logger.isCompatible(Level.WARN)).toBe(true);
    expect(logger.isCompatible(Level.INFO)).toBe(true);
    expect(logger.isCompatible(Level.DEBUG)).toBe(false);
  });

  test("isCompatible() with DEBUG level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.DEBUG);

    expect(logger.isCompatible(Level.CRITICAL)).toBe(true);
    expect(logger.isCompatible(Level.ERROR)).toBe(true);
    expect(logger.isCompatible(Level.WARN)).toBe(true);
    expect(logger.isCompatible(Level.INFO)).toBe(true);
    expect(logger.isCompatible(Level.DEBUG)).toBe(true);
  });

  test("critical() logs with prefix, date and level", () => {
    const options: LogOptions = {
      prefix: "TEST",
      hasDate: true,
      hasLevel: true,
      format: ""
    };
    const logger = new LogGenericImpl(options);

    logger.critical("critical message", "extra");
    logger.critical("second critical");

    const criticalLogs = capturedMessages.get(Level.CRITICAL) || [];
    expect(criticalLogs).toHaveLength(2);
    expect(criticalLogs[0]).toBe("TEST [CRITICAL] 20231225143015 critical message extra");
    expect(criticalLogs[1]).toBe("TEST [CRITICAL] 20231225143015 second critical");
  });

  test("error() logs with prefix, date and level", () => {
    const options: LogOptions = {
      prefix: "APP",
      hasDate: true,
      hasLevel: true,
      format: ""
    };
    const logger = new LogGenericImpl(options);

    logger.error("error message");
    logger.error("another error", "with extra");

    const errorLogs = capturedMessages.get(Level.ERROR) || [];
    expect(errorLogs).toHaveLength(2);
    expect(errorLogs[0]).toBe("APP [ERROR] 20231225143015 error message");
    expect(errorLogs[1]).toBe("APP [ERROR] 20231225143015 another error with extra");
  });

  test("warn() logs with prefix, date and level", () => {
    const logger = new LogGenericImpl({
      prefix: "SYSTEM",
      hasDate: true,
      hasLevel: true,
      format: ""
    });

    logger.warn("warning message");
    logger.warn("caution needed");

    const warnLogs = capturedMessages.get(Level.WARN) || [];
    expect(warnLogs).toHaveLength(2);
    expect(warnLogs[0]).toBe("SYSTEM [WARN] 20231225143015 warning message");
    expect(warnLogs[1]).toBe("SYSTEM [WARN] 20231225143015 caution needed");
  });

  test("info() logs with prefix, date and level", () => {
    const logger = new LogGenericImpl({
      prefix: "INFO",
      hasDate: true,
      hasLevel: true,
      format: ""
    });

    logger.info("information message");
    logger.info("process completed");

    const infoLogs = capturedMessages.get(Level.INFO) || [];
    expect(infoLogs).toHaveLength(2);
    expect(infoLogs[0]).toBe("INFO [INFO] 20231225143015 information message");
    expect(infoLogs[1]).toBe("INFO [INFO] 20231225143015 process completed");
  });

  test("debug() logs with prefix, date and level", () => {
    const logger = new LogGenericImpl({
      prefix: "DEBUG",
      hasDate: true,
      hasLevel: true,
      format: ""
    });

    logger.debug("debug message");
    logger.debug("variable value", 42, { test: true });

    const debugLogs = capturedMessages.get(Level.DEBUG) || [];
    expect(debugLogs).toHaveLength(2);
    expect(debugLogs[0]).toBe("DEBUG [DEBUG] 20231225143015 debug message");
    expect(debugLogs[1]).toBe("DEBUG [DEBUG] 20231225143015 variable value 42 [object Object]");
  });

  test("respects level setting - CRITICAL level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.CRITICAL);

    logger.debug("debug message");
    logger.info("info message");
    logger.warn("warn message");
    logger.error("error message");
    logger.critical("critical message");

    expect(capturedMessages.get(Level.DEBUG) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.INFO) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.WARN) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.ERROR) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.CRITICAL) || []).toHaveLength(1);
  });

  test("respects level setting - ERROR level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.ERROR);

    logger.debug("debug message");
    logger.info("info message");
    logger.warn("warn message");
    logger.error("error message");
    logger.critical("critical message");

    expect(capturedMessages.get(Level.DEBUG) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.INFO) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.WARN) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.ERROR) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.CRITICAL) || []).toHaveLength(1);
  });

  test("respects level setting - WARN level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.WARN);

    logger.debug("debug message");
    logger.info("info message");
    logger.warn("warn message");
    logger.error("error message");
    logger.critical("critical message");

    expect(capturedMessages.get(Level.DEBUG) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.INFO) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.WARN) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.ERROR) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.CRITICAL) || []).toHaveLength(1);
  });

  test("respects level setting - INFO level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.INFO);

    logger.debug("debug message");
    logger.info("info message");
    logger.warn("warn message");
    logger.error("error message");
    logger.critical("critical message");

    expect(capturedMessages.get(Level.DEBUG) || []).toHaveLength(0);
    expect(capturedMessages.get(Level.INFO) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.WARN) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.ERROR) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.CRITICAL) || []).toHaveLength(1);
  });

  test("respects level setting - DEBUG level", () => {
    const logger = new LogGenericImpl();
    logger.level(Level.DEBUG);

    logger.debug("debug message");
    logger.info("info message");
    logger.warn("warn message");
    logger.error("error message");
    logger.critical("critical message");

    expect(capturedMessages.get(Level.DEBUG) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.INFO) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.WARN) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.ERROR) || []).toHaveLength(1);
    expect(capturedMessages.get(Level.CRITICAL) || []).toHaveLength(1);
  });

    test("default options", () => {
      const logger = new LogGenericImpl();

      logger.info("test message");

      const infoLogs = capturedMessages.get(Level.INFO) || [];
      // Adjusted expected output to match the refactored log method and updated default options
      expect(infoLogs[0]).toBe("[INFO] 20231225143015 test message");
    });

    test("without date in prefix", () => {
      // hasDate: false, hasLevel: true
      const logger = new LogGenericImpl({
        prefix: "TEST",
        hasDate: false,
        hasLevel: true,
        format: ""
      });

      logger.info("message without date");

      const infoLogs = capturedMessages.get(Level.INFO) || [];
      // Adjusted expected output to not include the date
      expect(infoLogs[0]).toBe("TEST [INFO] message without date");
    });

    test("without level in prefix", () => {
      // hasDate: true, hasLevel: false
      const logger = new LogGenericImpl({
        prefix: "TEST",
        hasDate: true,
        hasLevel: false,
        format: ""
      });

      logger.info("message without level");

      const infoLogs = capturedMessages.get(Level.INFO) || [];
      // Adjusted expected output to not include the level
      expect(infoLogs[0]).toBe("TEST 20231225143015 message without level");
    });

    test("without prefix", () => {
      // prefix: "", hasDate: true, hasLevel: true
      const logger = new LogGenericImpl({
        prefix: "",
        hasDate: true,
        hasLevel: true,
        format: ""
      });

      logger.info("message without prefix");

      const infoLogs = capturedMessages.get(Level.INFO) || [];
      // Adjusted expected output to remove the leading space when prefix is empty
      expect(infoLogs[0]).toBe("[INFO] 20231225143015 message without prefix");
    });
});
