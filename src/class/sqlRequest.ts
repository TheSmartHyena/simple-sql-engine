import { DatabaseContent } from "../types/json";

interface Params {
    select: TableCol[]
    from: string
    joins: Join[]
    where: Where
}

// It's important to put the length 2 operator first => when we .includes we dont want false positives
const operators = [">=", "<=", ">", "<", "=" ] as const;
type Operator = typeof operators[number];
 
class TableCol {
    table: string = ""
    col: string = ""

    constructor(value: string) {
        const splitted = value.split(".")
        this.table = splitted[0]
        this.col = splitted[1]
    }

    getTable() {
        return this.table
    }

    getCol() {
        return this.col
    }
} 

class Join {
    table: string = ""
    localKey: string = ""
    externalKey: string = ""

    constructor(value: string) {
        const splitted = value.split("ON")
        this.table = splitted[0].trim()

        const splittedKeys = splitted[1].split("=")
        this.localKey = splittedKeys[0].trim()
        this.externalKey = splittedKeys[1].trim()
    }
}

class Where {
    tableCol: TableCol
    operator: Operator
    value: DatabaseContent

    constructor(rawLine: string) {
        this.operator = this.#findOperator(rawLine)
        
        const splitted = rawLine.split(this.operator)
        this.tableCol = new TableCol(splitted[0].trim())
        this.value = splitted[1].trim()
    }

    #findOperator(rawLine: string): Operator {
        for (const operator of operators) {
            if (rawLine.includes(operator)) {
                return operator
            }
        }
        return "=" // Should not be triggered but typescript was anoying
    }
}

export class SqlRequest {
    select: TableCol[]
    from: string
    joins: Join[]
    where: Where

    constructor(params: Params) {
        this.select = params.select
        this.from = params.from
        this.joins = params.joins
        this.where = params.where
    }
}

export class SqlRequestBuilder {
    #select: TableCol[] = []
    #from: string = ""
    #joins: Join[] = []
    #where: Where | undefined

    constructor() {
        return this   
    }

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

type SqlKeyword = "SELECT" | "FROM" | "JOIN" | "WHERE" 

export class SqlRequestBuilderHelper {
    static #getLinesByKeyword(keyWord: SqlKeyword, rawLines: string[]) {
        return rawLines.filter(line => line.includes(keyWord)).map(item => item.replace(keyWord, ""))
    }

    static getSqlRequest(rawLines: string[]): SqlRequest {
        const builder = new SqlRequestBuilder()

        builder
            .setSelect(this.#getLinesByKeyword("SELECT", rawLines)[0])
            .setFrom(this.#getLinesByKeyword("FROM", rawLines)[0])
            .setWhere(this.#getLinesByKeyword("WHERE", rawLines)[0])

        this.#getLinesByKeyword("JOIN", rawLines).forEach(line => {
            builder.addJoin(line)
        })

        return new SqlRequest(builder.build())
    }
}