const { Router } = require("express");
const fs = require("fs");
const sqlite = require("sqlite3");

const database = new sqlite.Database("server/db.sqlite");

/**
 * @type {Router}
 */
const router = new Router();

router.post("/create", async (req, res) => {

    try {
        var videoId = req.body["VideoUUID"];
        var reportReason = req.body["ReportReason"];
    } catch (err) {
        return res.sendStatus(400);
    }

    database.prepare("INSERT INTO reports (uuid, reason, timestamp) VALUES (?, ?, ?)").run(videoId, reportReason, Date.now());

    res.send("Thank you for your report. It will be reviewed soon.");

});

router.get("/get", async (req, res) => {

    if (req.auth) {
        database.prepare("SELECT * FROM reports LIMIT 10").all((err, rows) => {
            if (err) return console.log(err);

            res.json(rows);
        });
    } else {
        res.sendStatus(400);
    }

});

router.post("/accept", async (req, res) => {

    console.log("accept request received");

    try {
        var videoId = req.body.uuid;
        var timestamp = req.body.timestamp;
        console.log("videoId and timestamp in accept request calculated")
    } catch (err) {
        console.log(err.toString());
        return res.sendStatus(400);
    }

    if (req.auth) {
        fs.rmSync("media/" + videoId);
        console.log("removed from media successfully")
        clearReport(videoId);
        res.sendStatus(200);
    } else {
        console.log("no req.auth so yeah")
        res.sendStatus(400);
    }

});

router.post("/reject", async (req, res) => {

    try {
        var videoId = req.body.uuid;
        var timestamp = req.body.timestamp;
    } catch (err) {
        return res.sendStatus(400);
    }

    if (req.auth) {
        clearReport(videoId, timestamp);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }

});

function clearReport(uuid, timestamp = null) {

    if (timestamp == null) {
        database.prepare("DELETE FROM reports WHERE uuid = ?").run([uuid]);
        return;
    }

    database.prepare("DELETE FROM reports WHERE uuid = ? AND timestamp = ?").run([uuid, timestamp]);

}

module.exports = router;