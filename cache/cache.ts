import * as NodeCache from "node-cache";

export class Cache {

    private cache: NodeCache;

    constructor(stdTTL?: number, checkPeriod?: number) {
        if (!stdTTL) {
            stdTTL = 1000;
        }

        if (!checkPeriod) {
            checkPeriod = 1000;
        }

        this.cache = new NodeCache({ stdTTL, checkperiod: checkPeriod });

    }

    public set(key: string, value: any, ttl?: number, callback?: any) {
        this.cache.set(key, value, ttl ? Math.round(ttl / 1000) : null, callback);
    }

    public get(key: string, callback?: any) {
        return this.cache.get(key, callback);
    }

    public del(key: string, callback?: any) {
        return this.cache.del(key, callback);
    }

    public ttl(key: string, ttl?: number) {
        if (ttl) {
            return this.cache.ttl(key, ttl ? Math.round(ttl / 1000) : null);
        }

        return (this.cache.getTtl(key) as number) - Date.now();
    }
}
