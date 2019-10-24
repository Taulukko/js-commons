import { StringsUtil } from "./strings";
import * as uuidv4 from "uuid/v4";
import * as uuidv1 from "uuid/v1";

// 53 caracteres  12 (by version , cluster and Thread) - 8 (by random) - 31 (by clock)

const RADIX_BASE: number = 36;
const VERSION: string = "10";

class KeyTool {
    private stringUtil: StringsUtil = new StringsUtil();

    public build(cluster: number, proccessID: number): string {

        if (cluster >= 1000 || cluster < 0) {
            throw new Error("Cluster must be between 0-999");
        }

        if (proccessID >= 100000 || cluster < 0) {
            throw new Error("Cluster must be between 0-99999");
        }

        const uuidPart: string = uuidv1().substring(0, 8) + "-" + uuidv4().substring(0, 31);

        const strKey: string =
            VERSION +
            this.stringUtil.right("000" + cluster, 3) +
            this.stringUtil.right("000000" + proccessID, 6) + "--" + uuidPart;

        return strKey;
    }
}

export { KeyTool };
