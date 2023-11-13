const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload({
    "limits": {"fileSize": 64 * 1024 * 1024}
}));

app.get("/", async (req, res) => {

    res.send("the server is on!");

});

app.post

app.listen(80, () => {
    console.log("Server running on port 80.");
});