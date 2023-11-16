const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const sqlite = require("sqlite3");

const config = require("./config.json");

const database = new sqlite.Database("server/db.sqlite");

const app = express();
const fileParser = multer({
    storage: multer.diskStorage({
        filename: (req, file, save) => {
            try {
                save(null, uuid.v4() + path.extname(file.originalname));
            } catch (err) {
                save(new Error("Upload request sent with no attached video."));
            }
        },
        destination: (req, file, save) => {
            save(null, path.resolve("media"));
        }
    }),
    limits: {
        fileSize: 64 * 1024 * 1024
    },
    fileFilter: (req, file, save) => {
        let ext = path.extname(file.originalname).slice(1);
        if (!["mp4","avi","mov","asf","wmv"].includes(ext)) {
            return save(new Error("Only videos are allowed."));
        }
        save(null, true);
    }
});

app.use("/", express.static("client"));
app.use("/media", express.static("media"));
app.use(express.urlencoded());

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

    let videos = fs.readdirSync("media").filter(videoFile => !videoFile.endsWith(".txt"));

    res.send("/media/" + videos[Math.round(Math.random() * (videos.length - 1))]);

});

app.get("/getvideocount", async (req, res) => {

    res.send(fs.readdirSync("media").length);

});

app.post("/report", async (req, res) => {

    try {
        var videoId = req.body["VideoUUID"];
        var reportReason = req.body["ReportReason"];
    } catch (err) {
        return res.sendStatus(400);
    }

    database.prepare("INSERT INTO reports (uuid, reason) VALUES (?, ?)").run(videoId, reportReason);

    res.send("Thank you for your report. It will be reviewed soon.");

});

app.listen(config.port, () => {
    console.log("Server running on port " + config.port);
});