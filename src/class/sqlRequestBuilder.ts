import Params from "../interfaces/params"
import Join from "./join"
import TableCol from "./tableCol"
import Where from "./where"

class SqlRequestBuilder {
    #select: TableCol[] = []
    #from: string = ""
    #joins: Join[] = []
    #where: Where | undefined

    setSelect(rawLine: string) {
        const splitted = rawLine.split(",")        
        for (const item of splitted) {
            this.#select.push(new TableCol(item.trim()))
        }

        return this
    }

    setFrom(rawLine: string) {
        this.#from = rawLine.trim()
        return this
    }

    addJoin(rawLine: string) {
        this.#joins.push(new Join(rawLine))
        return this
    }

    setWhere(rawLine: string) {
        this.#where = new Where(rawLine)
        return this
    }

    build(): Params {
        return {
            select: this.#select,
            from: this.#from,
            joins: this.#joins,
            where: this.#where as Where
        }
    }
}

export default SqlRequestBuilder