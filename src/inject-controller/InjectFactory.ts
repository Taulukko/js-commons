export class InjectorFactory<T>{

    constructor(private readonly factory:()=>T){

    }

    public build():T{
        return this.factory();
    }
}