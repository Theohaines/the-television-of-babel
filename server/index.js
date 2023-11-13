const express = require("express");

const app = express();

app.get("/", async (req, res) => {

    res.send("the server is on!");

});

app.listen(8080, () => {
    console.log("Server running on port 8080.");
});