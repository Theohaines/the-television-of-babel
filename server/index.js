const express = require("express");
const { FtpServer } = require("ftp-srv");

const app = express();

const fileServer = new FtpServer();

app.get("/", async (req, res) => {

    res.send("the server is on!");

});

app.listen(8080, () => {
    console.log("Server running on port 8080.");
});