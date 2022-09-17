const notes = require("express").Router();
const fs = require("fs");
const notesFile = require("../db/db.json");

notes.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

notes.get("/api/", (req, res) => {
    console.log("api route")
    fs.readFile(notesFile, "utf-8", (err, data) =>
    error ? console.log(err) : res.json(JSON.parse(data)))
});

module.exports = notes;