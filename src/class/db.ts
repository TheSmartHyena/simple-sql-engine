import { Database,  } from "../types/json"
import Table from "./table"

class Db {
    #tables = new Map<String, Table>()

    constructor(json: Database) {
        for (const key in json) {
            this.#tables.set(key, new Table(key, json[key]))
        }
    }

    getTableNames() {
        return this.#tables.keys()
    }

    getTables() {
        return this.#tables.values()
    }

    getTableEntries() {
        return this.#tables.entries()
    }

    getTable(name: string) {
        return this.#tables.get(name) as Table
    }
}

export default Db