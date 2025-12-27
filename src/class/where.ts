import { operators } from "../constants/operators"
import OperatorsList from "../enums/operators"
import { DatabaseContent } from "../types/json"
import { Operator } from "../types/operator"
import TableCol from "./tableCol"

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

    #lessThan(a: DatabaseContent, b: DatabaseContent) {
        return a < b
    }

    #lessEqualThan(a: DatabaseContent, b: DatabaseContent) {
        return a <= b
    }

    #greaterThan(a: DatabaseContent, b: DatabaseContent) {
        return a > b
    }

    #greaterEqualThan(a: DatabaseContent, b: DatabaseContent) {
        return a >= b
    }

    #equal(a: DatabaseContent, b: DatabaseContent) {
        return a == b
    }

    compare(a: DatabaseContent): boolean {
        switch(this.operator) {
            case OperatorsList.LOWER: 
                return this.#lessThan(a, this.value)
            case OperatorsList.LOWER_EQUAL: 
                return this.#lessEqualThan(a, this.value)
            case OperatorsList.GREATER:
                return this.#greaterThan(a, this.value)
            case OperatorsList.GREATER_EQUAL:
                return this.#greaterEqualThan(a, this.value)
            case OperatorsList.EQUAL:
                return this.#equal(a, this.value)
            default:
                return false
        }
    }
}

export default Where