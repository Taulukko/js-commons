import { StringsUtil } from "./strings"; 
// 53 caracteres  12 (by version , cluster and Thread) - 8 (by random) - 31 (by clock)

const RADIX_BASE: number = 36;
const VERSION: string = "10";

class KeyTool {
    private stringUtil: StringsUtil = new StringsUtil();

    private generateUUID() : string { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    

    public build(cluster: number, proccessID: number): string {

        if (cluster >= 1000 || cluster < 0) {
            throw new Error("Cluster must be between 0-999");
        }

        if (proccessID >= 100000 || cluster < 0) {
            throw new Error("Cluster must be between 0-99999");
        }

        const random: string = this.stringUtil.right("0000" + Math.round(Math.random()*9999), 4) ;

        const uuidPart: string = this.generateUUID(); 

        const strKey: string =
            VERSION +
            this.stringUtil.right("000" + cluster, 3) +
            this.stringUtil.right("000000" + proccessID, 6) + random +  "--" + uuidPart;
 

        return strKey;
    }
}

export { KeyTool };
