// __tests__/UserController.spec.ts
import { InjectorFactory } from "../inject-controller/InjectFactory";
import { injectController } from "../inject-controller/inject-controller";

class UserRepository{

    readonly #id:number = Math.round(Math.random()*1000000);
    constructor(public name:string)
    {}

    public get id():number{
      return this.#id;
    }

}
  
describe("UserController", () => {
 

  beforeEach(() => {
    jest.clearAllMocks();

   injectController.clearAll();
    
     
  });
 
  it("singletone", () => {
   injectController
    .registerByName<UserRepository>(
    "UserRepositorySingleton" ,
     new UserRepository(Math.round(1000 * Math.random()) + ""));

    const expected1:UserRepository  = injectController.resolve<UserRepository>("UserRepositorySingleton" );
    const expected2:UserRepository  = injectController.resolve<UserRepository>("UserRepositorySingleton" );
    expect(expected1.name).toBe(expected2.name);
  }); 

    it("por classe mas não singleton", () => {
      injectController 
      .registerByClass<()=>UserRepository>( 
        () => new UserRepository( Math.round(1000 * Math.random()) + ""));


     const expected1:()=>UserRepository  = injectController.resolve<()=>UserRepository>("Function" );
     const expected2:()=>UserRepository  = injectController.resolve<()=>UserRepository>("Function" );
     expect(expected1().name).not.toBe(expected2().name);
  }); 
  
  it("por classe singleton", () => {
      injectController 
      .registerByClass<UserRepository>( 
         new UserRepository( Math.round(1000 * Math.random())+ ""));


     const expected1:UserRepository  = injectController.resolve<UserRepository>("UserRepository" );
     const expected2:UserRepository  = injectController.resolve<UserRepository>("UserRepository" );
     expect(expected1.name).toBe(expected2.name);
  }); 
  

  it("undefined", () => {
     injectController
        .registerByName<UserRepository>("exist",
            new UserRepository(Math.round(1000 * Math.random()) + "") );

    try{
      injectController.resolve<UserRepository>("not-exist" );
       fail("Expected an error here");
    }
    catch(e)
    { 
      expect(e).toBeDefined();
      expect(e).not.toBeNull();
    }
    finally
    {
      const expected2:UserRepository  = injectController.resolve<UserRepository>("exist" );
       expect(expected2).not.toBeNull();
    }
    
   
  });
    
  it("randon by name using function", () => {
    injectController
      .registerByName<()=>UserRepository>("UserRepositoryRandom",
        () => new UserRepository(Math.round(1000 * Math.random()) + "") );

     const expected1:()=>UserRepository  = injectController.resolve<()=>UserRepository>("UserRepositoryRandom" );
     const expected2:()=>UserRepository  = injectController.resolve<()=>UserRepository>("UserRepositoryRandom" );
      
    expect(expected1().name).not.toBe(expected2().name); 
    expect(expected1().id).not.toBe(expected2().id); 
  });
   
  it ("using constructor singleton", () => {
      injectController
        .registerByName<UserRepository>("UserRepositorySingleton",
          new UserRepository("Gand") );
          
      const expected1:UserRepository  = injectController.resolve<UserRepository>("UserRepositorySingleton" );
      const expected2:UserRepository  = injectController.resolve<UserRepository>("UserRepositorySingleton" );
      expect(expected1.name).toBe(expected2.name);  
      expect(expected1.id).toBe(expected2.id);  
     
  }); 

  it ("remove using string", () => { 
      injectController
        .registerByName<UserRepository>("UserRepository",
          new UserRepository("Gand") );
          
      const expected1:UserRepository  = injectController.resolve<UserRepository>("UserRepository" );
      injectController.unregister("UserRepository");
      try{
          expect(expected1).toBeDefined();
          expect(expected1).not.toBeNull();
          expect(expected1.name).toBeDefined();
          expect(expected1.name).not.toBeNull();
          expect(expected1.id).toBeDefined();
          expect(expected1.id).not.toBeNull();
         injectController.resolve<UserRepository>("UserRepository" );
         fail("Is expected an error");
      }
      catch(e)
      {
         expect(e).toBeDefined();
        expect(e).not.toBeNull();
      }
     
    
     
  }); 
 
  
  it ("remove using type", () => {
    
    
      injectController
        .registerByClass<UserRepository>(new UserRepository("Gand") );
          
      const expected1:UserRepository  = injectController.resolve<UserRepository>("UserRepository" );
      injectController.unregister(expected1);
      try{
          expect(expected1).toBeDefined();
          expect(expected1).not.toBeNull();
          expect(expected1.name).toBeDefined();
          expect(expected1.name).not.toBeNull();
          expect(expected1.id).toBeDefined();
          expect(expected1.id).not.toBeNull();
         injectController.resolve<UserRepository>("UserRepository" );
         fail("Is expected an error");
      }
      catch(e)
      {
         expect(e).toBeDefined();
        expect(e).not.toBeNull();
      }
     
    
     
  }); 
 

  
  it ("remove all", () => {
    
    
      injectController
        .registerByName<()=>UserRepository>("UserRepository1",()=>new UserRepository("Gand") );
      injectController
          .registerByName<()=>UserRepository>("UserRepository2",()=>new UserRepository("Gand") );
          
      const expected1:()=>UserRepository  = injectController.resolve<()=>UserRepository>("UserRepository1" );
      injectController.clearAll();
      try{
          expect(expected1).toBeDefined();
          expect(expected1).not.toBeNull();
          expect(expected1().name).toBeDefined();
          expect(expected1().name).not.toBeNull();
          expect(expected1().id).toBeDefined();
          expect(expected1().id).not.toBeNull();

         injectController.resolve<UserRepository>("UserRepository2" );
         fail("Is expected an error");
      }
      catch(e)
      {
         expect(e).toBeDefined();
        expect(e).not.toBeNull();
      }
     
    
     
  }); 
 
  
  it ("using singtle = string need be return ever the same result", () => { 
    
      injectController
        .registerByName<string>("name",
           "Edson" );
          const result1:string = injectController.resolve("name");
          const result2:string = injectController.resolve("name");
          expect(result1).toBe(result2);
 
  }); 
 

  it ("using constructor never is singleton", () => { 
    try{
      injectController
        .registerByName<UserRepository>("UserRepositoryNotRandom",
          new UserRepository("Gand") );
    }
    catch(e)
    { 
      expect(e).toBeDefined();
      expect(e).not.toBeNull();
    }
  }); 
 
  it("not singleton by InjectFactory class", () => {
   injectController
  .registerByClass<UserRepository>( 
     new InjectorFactory<UserRepository>(()=> new UserRepository  ( Math.round(1000 * Math.random() )+ "")));
     const expected1:UserRepository  = injectController.resolve<UserRepository>("UserRepository" );
     const expected2:UserRepository  = injectController.resolve<UserRepository>("UserRepository" );
    expect(expected1.name).not.toBe(expected2.name);
  });  

   
 
  it("using function by class", () => {
   injectController
  .registerByClass<()=>UserRepository>( 
    () => new UserRepository( Math.round(1000 * Math.random()) + ""));
     const expected1:()=>UserRepository  = injectController.resolve<()=>UserRepository>("Function" );
     const expected2:()=>UserRepository  = injectController.resolve<()=>UserRepository>("Function" );
    expect(expected1().name).not.toBe(expected2().name);
  });  

  
  it("using function by name", () => {
   injectController
  .registerByName<()=>UserRepository>( "functionBuilder", 
    () => new UserRepository( Math.round(1000 * Math.random()) + ""));
     const expected1:()=>UserRepository  = injectController.resolve<()=>UserRepository>("functionBuilder" );
     const expected2:()=>UserRepository  = injectController.resolve<()=>UserRepository>("functionBuilder" );
    expect(expected1().name).not.toBe(expected2().name);
  });  
 
});
