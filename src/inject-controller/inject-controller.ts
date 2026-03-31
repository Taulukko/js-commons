import { InjectorFactory } from "./InjectFactory";

 
 
 
class InjectController {
  private readonly registrations = new Map<string, any>();
 
  registerByClass<T>(
    factory: InjectorFactory<T> | T
  ): this {
 

    let key:string;

    if( factory instanceof InjectorFactory)
    {
        key = factory.build().constructor.name; 
    }
    else{
      key = factory.constructor.name;
    }
 
    return this.registerByName(key,factory);
  }

 
  
  registerByName<T>(
    key:string,
    factory: InjectorFactory<T> | T
  ): this { 

      this.registrations.set(key,factory);
      return this;
  }

  resolve<T>(key:string):T{

    if(!this.registrations.has(key))
    {
      throw new Error( "key [" + key + "] not registered");
    }

    const registration =  this.registrations.get(key)  ;
    

    if(registration instanceof  InjectorFactory)
    {
      return (registration as InjectorFactory<T>).build();
    }
  
    return registration as T;
  }  

  has<T>(key:string|T):boolean
  {
    if(typeof key != "string")
    {
      key = (key as any).constructor.name;
    }
    return this.registrations.has(key as string);
  }

  clearAll():this{
    this.registrations.clear();
    return this;
  }

  unregister<T>(key:string|T):this{
    if(typeof key != "string")
    {
      key = (key as any).constructor.name;
    }
    this.registrations.delete(key as string);

    return this;
  }

}

export const injectController = new InjectController();
