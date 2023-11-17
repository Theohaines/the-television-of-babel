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

    try {
        var videoId = req.body.uuid;
        var timestamp = req.body.timestamp;
    } catch (err) {
        return res.sendStatus(400);
    }

    if (req.auth) {
        fs.rmSync("media/" + videoId);
        clearReport(videoId, timestamp);
        res.sendStatus(200);
    } else {
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

function clearReport(uuid, timestamp) {

    database.prepare("DELETE FROM reports WHERE uuid = ? AND timestamp = ?").run([uuid, timestamp]);

}

module.exports = router;