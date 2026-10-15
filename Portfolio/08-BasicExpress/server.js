const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const bmi = (weight / (height * height)) * 10000;
    res.send("Your BMI is " + bmi);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
