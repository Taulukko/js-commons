export enum Level{
    
    CRITICAL="CRITICAL",
    ERROR="ERROR",
    WARN="WARN",
    INFO="INFO",
    DEBUG="DEBUG"

};

export type LogFunction  = (...args:Array<any>)=>void;

export interface Log{
    level:(level:Level|undefined)=>Level;
    isCompatible:(level:Level)=>boolean;
    critical:LogFunction;
    error:LogFunction;
    warn:LogFunction;
    info:LogFunction;
    debug:LogFunction;
}



 