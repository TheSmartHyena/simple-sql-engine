// Load Database

// Parse SQL Request into an object through a builder 


// Sending the SQL Request object to the database

// The datase create an instance of a class for a result lets call it : "intermediary"
    // intermediary will have a clone of the main table inside, with all unfiltered rows
        // FROM
    // JOIN -> Will have a list of tables instance, will all rows
    // WHERE: 
        // Flatten all the rows, will result on duplicated data
        // Filter all the rows that does not match the condition
        // SELECT -> Filter all unwanted columns

import json from "./database.json"
import Db from "./class/db"
import { Database } from "./types/json"

const db = new Db(json satisfies Database)

/* 
Do an iteration over parsed DB
for (const table of db.getTables()) {
    console.log('Poney A', table.getName())
    for (const row of table.getRows()) {
        for (const [colName, colValue] of row.getColsEntries()) {
            console.log('POney B', colName, colValue)
        }
    }
}
*/ 