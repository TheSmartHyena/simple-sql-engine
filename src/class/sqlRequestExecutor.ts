import { DatabaseContent, DatabaseTableRow } from "../types/json"
import Db from "./db"
import Row from "./row"
import { SqlRequest } from "./sqlRequest"
import Table from "./table"

class SqlRequestExecutor {
    // Main stuff
    #db: Db
    #sqlRequest: SqlRequest

    // Request treatment props
    #table: Table
    #flattened: Record<string, DatabaseContent>[] = []
    #flattenedFiltered: Record<string, DatabaseContent>[] = []

    constructor(db: Db, sqlRequest: SqlRequest) {
        this.#db = db
        this.#sqlRequest = sqlRequest

        this.#table = [...db.getTableEntries()].find(([key]) => key === this.#sqlRequest.from)?.[1] as Table
    }

    #flatten() {
        for (const row of this.#table.getRows()) {
            const result: Record<string, DatabaseContent> = {}
            for (const [key, value] of row.getColsEntries()) {
                result[`${this.#table.getName()}.${key}`] = value
            }
            this.#flattened.push(result)
        }
    }

    #join() {
        for (const join of this.#sqlRequest.joins) {
            const result: Record<string, DatabaseContent>[] = []

            for (const row of this.#flattened) {
                const joinedTable = this.#db.getTable(join.getTable())

                const toJoinRows = [...joinedTable.getRows()]
                    .filter(item => {
                        return row[join.getExternalKey()] === item.getCol(join.getLocalKeyCol())
                    }).map(item => item.getColsEntries())
                
                toJoinRows.forEach(item => {
                    const remapped: Record<string, DatabaseContent>  = {};
                    [...item].forEach(([key, value]) => {
                        remapped[`${join.getTable()}.${key}`] = value
                    })
                    result.push({ ...row, ...remapped })
                })
            }   
            this.#flattened = result
        }
    }

    #where() {

    }

    #export() {
        
    }

    execute() {
        this.#flatten()
        this.#join()
        console.log('Poney flattened', this.#flattened)


    }
}   

export default SqlRequestExecutor