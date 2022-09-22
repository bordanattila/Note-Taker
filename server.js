const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const apiroutes = require("./routes/apiroutes.js")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiroutes)

// Homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

});

// Notes route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Wildcard route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});


app.listen(PORT, () => { console.log(`Server listening at port http://localhost:${PORT}`) })