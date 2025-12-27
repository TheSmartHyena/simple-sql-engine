import SqlKeywords from "../enums/sql-keywords"
import SqlRequest from "./sqlRequest"
import SqlRequestBuilder from "./sqlRequestBuilder"

class SqlRequestBuilderHelper {
    static #getLinesByKeyword(keyWord: SqlKeywords, rawLines: string[]) {
        return rawLines.filter(line => line.includes(keyWord)).map(item => item.replace(keyWord, ""))
    }

    static getSqlRequest(rawLines: string[]): SqlRequest {
        const builder = new SqlRequestBuilder()

        builder
            .setSelect(this.#getLinesByKeyword(SqlKeywords.SELECT, rawLines)[0])
            .setFrom(this.#getLinesByKeyword(SqlKeywords.FROM, rawLines)[0])
            .setWhere(this.#getLinesByKeyword(SqlKeywords.WHERE, rawLines)[0])

        this.#getLinesByKeyword(SqlKeywords.JOIN, rawLines).forEach(line => {
            builder.addJoin(line)
        })

        return new SqlRequest(builder.build())
    }
}

export default SqlRequestBuilderHelper