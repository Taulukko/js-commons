// (use to log) import * as  fs  from 'fs';
import * as  async_hooks from "async_hooks";

export class Context {

    public id?: number;
    private globalVars?: any;
    private map: Map<string, any> = new Map();

    // private log = (str) => fs.writeSync(1, `${str}\n`);

    constructor() {

        this.id = async_hooks.executionAsyncId();
        this.globalVars = global;

        if (!this.globalVars[`session${this.id}`]) {
            this.globalVars[`session${this.id}`] = this.map;
        } else {
            this.map = this.globalVars[`session${this.id}`];
        }

        /*
        //dentro de outra timeline, é outro id, pra corrigir isso precisa
        //retrabalhar o objeto contexto para ele pegar o primeiro pai mapeado,
        //Mapeando a arvore de ids, é possível que, se foi criado um contexto
        //em A e C é filho de A, ao pedir C ele vai na arvore e busca o
        //primeiro contexto criado na arvore e pega o A.
        //A (foi criado contexto com este)
        //|__B
        //|__C
        //   |__D => (solicitou
        // o contexto ID, ele volta na árvore até onde foi criado o contexto
        // e em vez de devolver o ID de D , devolve o ID de A)

        Para  mapear ids de pais e filhos quando o filho é criado com funcoes asincronas como setTimeout
        async_hooks.createHook({
          init(asyncId, type, triggerAsyncId) {
            log(`INIT: asyncId: ${asyncId} / type: ${type} / trigger: ${triggerAsyncId}`);
          },
          destroy(asyncId) {
            log(`DESTROY: asyncId: ${asyncId}`);
          },
        }).enable()
        */

    }

    public set(key: string, value: any) {
        this.map.set(key, value);
    }

    public get(key: string) {
        return this.map.get(key);
    }

    public get size(): number {
        return this.map.size;
    }

    public keys(): IterableIterator<string> {
        return this.map.keys();
    }
}
