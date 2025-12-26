export type Database = Record<string, DatabaseTable>

export type DatabaseTable = DatabaseTableRow[]

export type DatabaseTableRow = Record<string, DatabaseContent>

export type DatabaseContent = string | Number 
