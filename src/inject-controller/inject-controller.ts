import { InjectorFactory } from "./InjectFactory";

/**
 * Controller for dependency injection registration and resolution.
 * Manages a registry of factories and instances that can be accessed by class type or name.
 * Supports registering by class constructor or by a custom string key.
 */
class InjectController {
  private readonly registrations = new Map<string, any>();

  /**
   * Registers a factory or instance using its class constructor name as the key.
   * @param factory - An InjectorFactory instance or a class instance to register
   * @returns This controller instance for method chaining
   * @template T - The type of the factory or instance being registered
   */
  registerByClass<T>(
    factory: InjectorFactory<T> | T
  ): this {


    let key: string;

    if (factory instanceof InjectorFactory) {
      key = factory.build().constructor.name;
    }
    else {
      key = factory.constructor.name;
    }

    return this.registerByName(key, factory);
  }



  /**
   * Registers a factory or instance using a custom string key.
   * @param key - The unique key to associate with the registration
   * @param factory - An InjectorFactory instance or a value to register
   * @returns This controller instance for method chaining
   * @template T - The type of the factory or instance being registered
   */
  registerByName<T>(
    key: string,
    factory: InjectorFactory<T> | T
  ): this {

    this.registrations.set(key, factory);
    return this;
  }

  /**
   * Resolves and returns the registered factory or instance by key.
   * If the registered value is an InjectorFactory, it will be built before returning.
   * @param key - The key to look up in the registry
   * @returns The registered instance or the result of building an InjectorFactory
   * @throws Error if the key is not registered
   * @template T - The expected return type
   */
  resolve<T>(key: string): T {

    if (!this.registrations.has(key)) {
      throw new Error("key [" + key + "] not registered");
    }

    const registration = this.registrations.get(key);


    if (registration instanceof InjectorFactory) {
      return (registration as InjectorFactory<T>).build();
    }

    return registration as T;
  }

  /**
   * Checks whether a key or class is registered in the controller.
   * @param key - A string key or a class constructor to check for registration
   * @returns True if the key is registered, false otherwise
   * @template T - The type of the class if passed as constructor
   */
  has<T>(key: string | T): boolean {
    if (typeof key != "string") {
      key = (key as any).constructor.name;
    }
    return this.registrations.has(key as string);
  }

  /**
   * Removes all registrations from the controller.
   * @returns This controller instance for method chaining
   */
  clearAll(): this {
    this.registrations.clear();
    return this;
  }

  /**
   * Removes a specific registration from the controller by key or class.
   * @param key - A string key or a class constructor to unregister
   * @returns This controller instance for method chaining
   * @template T - The type of the class if passed as constructor
   */
  unregister<T>(key: string | T): this {
    if (typeof key != "string") {
      key = (key as any).constructor.name;
    }
    this.registrations.delete(key as string);

    return this;
  }

}

/**
 * Singleton instance of InjectController for dependency injection management.
 * Use this instance to register, resolve, and manage injectable dependencies.
 */
export const injectController = new InjectController();
