import Join from "../class/join"
import TableCol from "../class/table-col"
import Where from "../class/where"

interface Params {
    select: TableCol[]
    from: string
    joins: Join[]
    where: Where
}

export default Params