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

    getTableCol() {
        return `${this.table}.${this.col}`
    }
} 

export default TableCol