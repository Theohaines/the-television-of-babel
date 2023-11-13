const express = require("express");
const { FtpServer } = require("ftp-srv");

const app = express();

const fileServer = new FtpServer({
    url: "ftp://127.0.0.1:21"
});

app.get("/", async (req, res) => {

    res.send("the server is on!");

});

app.listen(80, () => {
    console.log("Server running on port 80.");
});