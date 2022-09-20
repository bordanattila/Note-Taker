const apinotes = require("express").Router();
const fs = require("fs");
const notesFile = require("../db/db.json");
const util = require('util');


// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};



apinotes.get("/notes", (req, res) => {
    console.log("api route")
    // fs.readFile("../db/db.json", "utf-8", (err, data) =>
    // error ? console.log(err) : res.json(JSON.parse(data)))
    readFromFile(notesFile).then((data) => res.json(JSON.parse(data)));
});

module.exports = apinotes;