import { DatabaseContent, DatabaseTableRow } from "../types/json";

class Row {
    #cols = new Map<string, DatabaseContent>()

    constructor(row: DatabaseTableRow) {
        for (const key in row) {
            this.#cols.set(key, row[key])
        }
    }

    getColsKeys() {
        return this.#cols.keys()
    }

    getColsValues() {
        return this.#cols.values()
    }

    getColsEntries() {
        return this.#cols.entries()
    }

    getCol(name: string) {
        return this.#cols.get(name)
    }
}

export default Row