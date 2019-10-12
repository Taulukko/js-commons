import { Context } from "./context";

describe("Context", () => {
    beforeEach(() => {
        jest.setTimeout(5000);
    });

    test("create and get context", async () => {

        let context: Context = new Context();

        const contextID: number = context.id;

        context = new Context();

        expect(context.id).toBe(contextID);

        const buildPromisse: () => Promise<number> = () => new Promise((resolve, reject) => {

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
            */
            setTimeout(() => {
                const context: Context = new Context();

                const contextID: number = context.id;

                resolve(contextID);
            }, 1100);

        });

        const result: number = await buildPromisse();

        expect(result).not.toBe(contextID);

        context = new Context();

        expect(context.id).toBe(contextID);

    });

    test("create and get context", async () => {

        let context: Context = new Context();

        const contextID: number = context.id;

        context = new Context();

        expect(context.id).toBe(contextID);

        context.set("age", 35);
        context.set("name", "Xisto");

        expect(context.size).toBe(2);

        context = new Context();

        expect(context.id).toBe(contextID);

        expect(context.size).toBe(2);

        expect(context.get("age")).toBe(35);
        expect(context.get("name")).toBe("Xisto");

    });
});
