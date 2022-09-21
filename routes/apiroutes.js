const apiroutes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// API routes
apiroutes.get("notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) =>
    err ? console.log(err) : res.send(data));
  });
  
  apiroutes.post("notes", (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            "id": uuidv4(),
        };
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) console.log(err) ;
            try{
                const currentFile = JSON.parse(data);
                currentFile.push(newNote);
                fs.writeFile("./db/db.json", JSON.stringify(currentFile), (data) => res.send(JSON.parse(data)));
            } catch (error) {
                const newNote = [{                    
                    "title": req.body.title,
                    "text": req.body.text,
                    "id": uuidv4(),                    
                }];
                fs.writeFile("./db/db.json", JSON.stringify(newNote), (data) => res.send(JSON.parse(data)));
            };
        });
        
    } else {
        console.log(err);
    }
  });
  
  apiroutes.delete("/notes/:id", (req, res) => {
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

  module.exports = apiroutes;
  