import { DatabaseTable } from "../../types/json"
import Row from "./row"


class Table {
    #name = ""
    #rows: Row[]

    constructor(name: string, content: DatabaseTable) {
        this.#name = name
        this.#rows = []
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