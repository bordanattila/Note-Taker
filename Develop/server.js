const express = require("express");
const uuid = require("uuid");
const path = require("path");
const api = require("./routes/routes")

const PORT = process.env.PORT || 3001;
const notesFile = require("./db/db.json");


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api", api)
app.use(express.static("public"));

//Homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

});


// Wildcard route
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"))
// });


app.listen(PORT, () => { console.log(`Server listening at port http://localhost:${PORT}`) })