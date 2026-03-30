 
 

interface Registration<T> {
  factory: () => T; 
  singleton:boolean;
  instance:T
}

class InjectController {
  private registrations = new Map<any, Registration<any>>();
 
  registerByClass<T>(
    factory: (() => T) | T,
    singleton = false,
  ): this {

    let  instance:any ;

    if(factory instanceof Function)
    {
        instance=factory() as T;
    }
    else
    {
        instance=factory;
    }

    if(singleton)
    {
      factory = ()=> instance;
    }

    return this.registerByName(instance.constructor.name,factory,singleton);
  }

 
  
  registerByName<T>(
    key:string,
    factory: (() => T ) | T,
    singleton:boolean = false 
  ): this {

    let registration: Registration<T>;
    
    if(factory instanceof Function )
    { 
      registration = {
        factory : factory as ()=>T,
        singleton,
        instance:factory()
      };
    }
    else{ 

      if(singleton)
      {
         throw new Error( "To be singleton need be a factory and not an instance");
      }

       registration = {
        factory: ()=> factory,
        singleton,
        instance: factory as T
      };
    }
 
     
    if(registration.singleton)
    {
      registration.factory = ()=>registration.instance;
    }
    this.registrations.set( key , registration );
    return this;
  }

  resolve<T>(key:string):T{

    if(!this.registrations.has(key))
    {
      throw new Error( "key [" + key + "] not registered");
    }

    const registration: Registration<T> =  this.registrations.get(key) as Registration<T> ;
    

    if(registration.singleton)
    {
      return registration.instance as T;
    }
  
    return registration.factory();
  }  

  has<T>(key:string|T):boolean
  {
    if(typeof key != "string")
    {
      key = (key as any).constructor.name;
    }
    return this.registrations.has(key);
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
    this.registrations.delete(key);

    return this;
  }

}

export var injectController = new InjectController();
