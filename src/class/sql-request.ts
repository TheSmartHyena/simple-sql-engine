import Params from "../interfaces/params";
import Join from "./join";
import TableCol from "./table-col";
import Where from "./where";
 
class SqlRequest {
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

export default SqlRequest