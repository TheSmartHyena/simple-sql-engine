import TableCol from "./tableCol"

class Join {
    #table: string = ""
    #localKey: TableCol
    #externalKey: TableCol

    constructor(value: string) {
        const splitted = value.split("ON")
        this.#table = splitted[0].trim()

        const splittedKeys = splitted[1].split("=")
        this.#localKey = new TableCol(splittedKeys[0].trim())
        this.#externalKey = new TableCol(splittedKeys[1].trim())
    }

    getTable() {
        return this.#table
    }

    getLocalKey() {
        return `${this.#localKey.getTable()}.${this.#localKey.getCol()}`
    }

    getLocalKeyCol() {
        return this.#localKey.getCol()
    }

    getExternalKey() {
        return `${this.#externalKey.getTable()}.${this.#externalKey.getCol()}`
    }
}

export default Join