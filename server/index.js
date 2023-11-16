const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const sqlite = require("sqlite3");
const cookieParser = require("cookie-parser");
require("dotenv").config();

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
app.use(cookieParser());

app.use((req, res, next) => {
    let { babeltv_auth = "" } = req.cookies;
    req.auth = babeltv_auth == process.env.AUTH;
    next();
});

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

app.get("/login", async (req, res) => {

    res.sendFile(path.resolve("client/login.html"));

});

app.get("/admin", async (req, res) => {

    if (req.auth) {
        res.sendFile(path.resolve("client/admin.html"));
    } else {
        res.redirect("/");
    }

});

app.get("/reports", async (req, res) => {

    if (req.auth) {
        database.prepare("SELECT * FROM reports").all((err, rows) => {
            if (err) return console.log(err);

            res.json(rows);
        });
    } else {
        res.sendStatus(400);
    }

});

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});