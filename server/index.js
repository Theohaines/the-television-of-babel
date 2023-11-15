const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const config = require("./config.json");

const app = express();
const fileParser = multer({
    storage: multer.diskStorage({
        filename: (req, file, save) => {
            save(null, uuid.v4() + "." + file.originalname.split(".").at(-1));
        },
        destination: (req, file, save) => {
            save(null, path.resolve("media"));
        }
    }),
    limits: {
        fileSize: 64 * 1024 * 1024
    },
    fileFilter: (req, file, save) => {
        let ext = path.extname(file.originalname);
        if (!["mp4","avi","mov","asf","wmv"].includes(ext)) {
            return save(new Error("Only videos are allowed."));
        }
        save(null, true);
    }
});

app.use("/", express.static("client"));
app.use("/media", express.static("media"));

app.get("/", async (req, res) => {

    res.sendFile(path.resolve("client/index.html"));

});

app.get("/upload", async (req, res) => {

    res.sendFile(path.resolve("client/upload.html"));

});

app.post("/upload", fileParser.single("UploadedVideo"), async (req, res) => {

    let video = req.file;

    try {
        console.log(`file received! ${video.originalname} with size ${video.size} bytes`);
    } catch (err) {
        console.log("no file found in request...");
    }

    res.redirect("/");

});

app.get("/getvideo", async (req, res) => {

    let videos = fs.readdirSync("media");
    res.send("/media/" + videos[Math.round(Math.random() * videos.length - 1)]);

});

app.listen(config.port, () => {
    console.log("Server running on port " + config.port);
});