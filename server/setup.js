const sqlite = require("sqlite3");

const database = new sqlite.Database("server/db.sqlite");

function setupDatabase() {

    database.prepare("CREATE TABLE reports (uuid TEXT, reason TEXT)").run();
    
    console.log("Database tables generated...");

}

setupDatabase();