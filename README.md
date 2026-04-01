# taulukko-commons

A collection of utility classes for common development tasks including string manipulation, date handling, object utilities, key generation, logging, and dependency injection.

## Installation

```bash
npm install taulukko-commons
```

## Usage

```typescript
import { StringsUtil, DatesUtil, ObjectsUtil, KeyTool, injectController, InjectorFactory, Log, Level, LogGenericImpl } from 'taulukko-commons';
```

---

## StringsUtil

Utility class for string manipulation operations.

### Methods

| Method | Description |
|--------|-------------|
| `left(str, n)` | Returns the first n characters from the left side of the string. |
| `trim(str)` | Removes whitespace from both ends of a string. |
| `right(str, n)` | Returns the last n characters from the right side of the string. |
| `repeat(str, n, separator)` | Repeats a string n times, joined by a separator. |
| `leftPadding(str, n, paddingValue)` | Pads the string on the left with a specified value until it reaches the desired length. |
| `rightPadding(str, n, paddingValue)` | Pads the string on the right with a specified value until it reaches the desired length. |
| `count(str, find)` | Counts the number of occurrences of a substring within a string. |
| `hashNumber(str)` | Generates a numeric hash code (32-bit integer) for the given string. |
| `hashString(str)` | Generates a base-36 string representation of the hash code. |

### Example

```typescript
const strings = new StringsUtil();

strings.left("Hello", 3);          // "Hel"
strings.right("Hello", 3);         // "llo"
strings.leftPadding("5", 4, "0");   // "0005"
strings.count("hello world", "o");  // 2
strings.hashNumber("test");         // 3556498
```

---

## DatesUtil

Utility class for date manipulation and formatting operations.

### Methods

| Method | Description |
|--------|-------------|
| `addDays(date, days)` | Adds the specified number of days to a date. |
| `parseYYYYMMDD(dateStr)` | Parses a string in `YYYYMMDD` format into a Date object. |
| `parseYYYYMMDDHHMMSS(dateStr)` | Parses a string in `YYYYMMDDHHMMSS` format into a Date object. |
| `parse(year, month, day, hour?, minute?, second?)` | Creates a Date from individual components. |
| `getYear(date)` | Returns the year from a Date object. |
| `getMonth(date)` | Returns the month (1-12) from a Date object. |
| `getMonthIndex(date)` | Returns the month index (0-11) from a Date object. |
| `getDay(date)` | Returns the day of the month from a Date object. |
| `getDayOfWeak(date)` | Returns the day of the week (1-7, Sunday=1) from a Date object. |
| `getDayOfWeakIndex(date)` | Returns the day of the week index (0-6, Sunday=0) from a Date object. |
| `toString(date, size?)` | Formats a Date to string in `YYYYMMDDHHMMSS` format with configurable size (1-14). |

### Example

```typescript
const dates = new DatesUtil();

const today = new Date();
const nextWeek = dates.addDays(today, 7);

const date = dates.parseYYYYMMDD("20240315");        // March 15, 2024
const dateTime = dates.parseYYYYMMDDHHMMSS("20240315143055"); // 2:30:55 PM on March 15, 2024

dates.toString(today);       // "20240315143055"
dates.toString(today, 8);    // "20240315"
```

---

## ObjectsUtil

Utility class for object manipulation operations.

### Methods

| Method | Description |
|--------|-------------|
| `shallowCopy(data)` | Creates a shallow copy of an object using JSON serialization. |
| `partialCopy(from, to, fields)` | Copies specific fields from one object to another. |

### Example

```typescript
const objects = new ObjectsUtil();

const original = { name: "John", age: 30, city: "NYC" };
const copy = objects.shallowCopy(original);

const target = { name: "", age: 0, city: "", country: "USA" };
const partial = objects.partialCopy(original, target, ["name", "age"]);
// { name: "John", age: 30, city: "", country: "USA" }
```

---

## KeyTool

Utility class for generating unique string keys with embedded metadata.

### Methods

| Method | Description |
|--------|-------------|
| `build(cluster, processID)` | Generates a unique key string with version, cluster, process ID, random, and UUID parts. |

### Example

```typescript
const keyTool = new KeyTool();

const key = keyTool.build(1, 12345);
// Format: VCCCPPRRRR--UUID
// Example: "1010000123456789--xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
```

### Key Format

The generated key follows this structure:
- `V` - Version (2 characters)
- `CCC` - Cluster ID (0-999)
- `PPPPPP` - Process ID (0-999999)
- `RRRR` - Random 4-digit number
- `UUID` - Standard UUID v4

---

## Logging

### Log Interface

```typescript
interface Log {
    level(level?: Level): Level;
    isCompatible(level: Level): boolean;
    critical(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
}
```

### Log Levels

```typescript
enum Level {
    DEBUG   = "DEBUG",
    INFO    = "INFO",
    WARN    = "WARN",
    ERROR   = "ERROR",
    CRITICAL = "CRITICAL"
}
```

### LogGenericImpl

A configurable logging implementation with dependency injection support.

#### Constructor Options

```typescript
interface LogOptions {
    prefix?: string;    // String prefix for each log message (default: "")
    hasDate?: boolean; // Include timestamp in output (default: true)
    hasLevel?: boolean; // Include level in output (default: true)
    format?: string;    // Reserved for backward compatibility
}
```

#### Example

```typescript
const logger = new LogGenericImpl({
    prefix: "MyApp",
    hasDate: true,
    hasLevel: true
});

logger.level(Level.DEBUG);  // Set minimum log level
logger.info("Application started");
logger.error("Connection failed", error);
logger.debug("Debug information");
```

#### Output Format

```
{prefix} [{level}] {YYYYMMDDHHMMSS}
```

Example: `MyApp [INFO] 20240315143055 Application started`

---

## Dependency Injection

### InjectController

A singleton controller for managing dependency injection registrations and resolution.

#### Methods

| Method | Description |
|--------|-------------|
| `registerByClass(factory)` | Registers a factory or instance using its class constructor name as the key. |
| `registerByName(key, factory)` | Registers a factory or instance using a custom string key. |
| `resolve(key)` | Resolves and returns the registered factory or instance by key. |
| `has(key)` | Checks whether a key or class is registered. |
| `unregister(key)` | Removes a specific registration from the controller. |
| `clearAll()` | Removes all registrations from the controller. |

### InjectorFactory

Factory class for creating instances on demand.

```typescript
class InjectorFactory<T> {
    constructor(private readonly factory: () => T) {}
    build(): T { return this.factory(); }
}
```

### Example

```typescript
import { injectController, InjectorFactory } from 'taulukko-commons';

// Register by class instance
class DatabaseService {}
injectController.registerByClass(new DatabaseService());

// Register by name with factory
injectController.registerByName("config", new InjectorFactory(() => ({
    host: "localhost",
    port: 5432
})));

// Resolve
const db = injectController.resolve("DatabaseService");
const config = injectController.resolve("config");

// Check if registered
if (injectController.has("DatabaseService")) { ... }

// Unregister
injectController.unregister("DatabaseService");
```

---

## License

MIT License - Taulukko Inc.
