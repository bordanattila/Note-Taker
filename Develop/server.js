const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

});

// Notes route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API routes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) =>
    err ? console.log(err) : res.send(data));
});

app.post("/api/notes", (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            "id": uuidv4(),
        };
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) console.log(err) ;
            const currentFile = JSON.parse(data);
            currentFile.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(currentFile), (data) => res.send(JSON.parse(data)));
        });
        
    } else {
        console.log(err);
    }
});

app.delete("/api/notes/:id", (req, res) => {
    console.log("deleting")
    const deleteID = req.params.id;    
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) console.log(err) ;
        const currentFile = JSON.parse(data);
        currentFile.forEach(element => {
            if (deleteID === element.id) {
                currentFile.pop(element);
                fs.writeFile("./db/db.json", JSON.stringify(currentFile), (data) => res.send(JSON.parse(data)));
            }
        });
    });
});

// Wildcard route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});


app.listen(PORT, () => { console.log(`Server listening at port http://localhost:${PORT}`) })