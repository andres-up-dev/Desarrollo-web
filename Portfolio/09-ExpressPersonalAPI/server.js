const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", require("ejs").renderFile);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

let names = [];
let tasks = [];

app.get("/", (req, res) => {
  res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
});

app.get("/greet", (req, res, next) => {
  if (req.query.id !== undefined) {
    let id = Number(req.query.id);
    if (req.query.id === "" || isNaN(id) || id < 0 || id >= names.length) {
      next(new Error("Index out of range"));
    } else {
      res.render(__dirname + "/html/wazzup.html", { name: names[id] });
    }
  } else if (req.query.name) {
    console.log(req.query.name);
    names.push(req.query.name);
    res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
  } else {
    res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
  }
});

app.put("/greet/:name", (req, res) => {
  names.push(req.params.name);
  res.json(names);
});

app.get("/task", (req, res) => {
  res.json(tasks);
});

app.post("/task", (req, res) => {
  if (req.body.task) {
    tasks.push(req.body.task);
  }
  res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
});

app.delete("/task", (req, res) => {
  let id = Number(req.query.id);
  if (!isNaN(id) && id >= 0 && id < tasks.length) {
    tasks.splice(id, 1);
  }
  res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
});

app.get("/task/delete", (req, res) => {
  let id = Number(req.query.id);
  if (!isNaN(id) && id >= 0 && id < tasks.length) {
    tasks.splice(id, 1);
  }
  res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
});

app.get("/task/up", (req, res) => {
  let id = Number(req.query.id);
  if (!isNaN(id) && id > 0 && id < tasks.length) {
    let temp = tasks[id - 1];
    tasks[id - 1] = tasks[id];
    tasks[id] = temp;
  }
  res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
});

app.get("/task/down", (req, res) => {
  let id = Number(req.query.id);
  if (!isNaN(id) && id >= 0 && id < tasks.length - 1) {
    let temp = tasks[id + 1];
    tasks[id + 1] = tasks[id];
    tasks[id] = temp;
  }
  res.render(__dirname + "/html/index.html", { names: names, tasks: tasks });
});

app.use((err, req, res, next) => {
  res.render(__dirname + "/html/index.html", { error: err.message, names: names, tasks: tasks });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
