/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URI;

// Logic to connect to the correct DB - prod or test
if (process.env.NODE_ENV === "test") {
    // Would change this to test DB but prompt doesn't ask for that
    DB_URI = "postgresql:///biztime";
} else {
    DB_URI = "postgresql:///biztime_prod"
}

// Set connection URL to DB
let db = new Client({
    connectionString: DB_URI
})

// Connect!
db.connect()

module.exports = db;