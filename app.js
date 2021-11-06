const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const port = 3000;

let answers = JSON.parse(fs.readFileSync("serverData.json"));

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/serverData.json', (req, res) => {
    res.json(answers);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});