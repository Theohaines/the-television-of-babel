const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const config = require("./config.json");

const app = express();

app.use(fileUpload({
    "limits": {"fileSize": 64 * 1024 * 1024}
}));

app.use("/", express.static("client"));

app.get("/upload", async (req, res) => {

    res.sendFile(path.resolve("client/upload.html"));

});

app.post("/upload", async (req, res) => {

    let video = req.files["UploadedVideo"];

    console.log(`file received! ${video.name} with size ${video.size} bytes`);

});

app.listen(config.port, () => {
    console.log("Server running on port " + config.port);
});