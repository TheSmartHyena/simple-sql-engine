import { DatabaseTable } from "../types/json";
import Row from "./row";

class Table {
    #name = ""
    #rows = new Array<Row>()

    constructor(name: string, content: DatabaseTable) {
        this.#name = name
        for (const entry of content) {
            this.#rows.push(new Row(entry))
        }
    }

    getName() {
        return this.#name
    }

    getRows() {
        return this.#rows.values()
    }
}

export default Table