var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

require('dotenv').config();
let PORT = process.env.PORT;
app.set('port', process.env.PORT);

app.listen(PORT, function () {
  console.log('Server started on port ' + PORT);
});

let task = [];
let complete = [];
app.post('/addtask', function (req, res) {
  let newTask = req.body.newtask;
  task.push(newTask);
  res.redirect("/");
});

app.get("/", function(req, res) {    
  res.render("index", { task: task, complete: complete});
});

app.get("*", function(req, res) {
  res.send("<h1>Invalid Page</h1>");
});

app.post("/completetask", function(req, res) {
  let deleteTask = req.body.check;

  for (let i = 0; i < task.length; i++) {
    if (task[i] == deleteTask) {
      task.splice(i, 1);
      complete.push(deleteTask);
      break;
    }
  }

  res.redirect("/");
});

app.post("/removetask", function(req, res) {
  let deleteTask = req.body.check;

  for (let i = 0; i < task.length; i++) {
    if (task[i] == deleteTask) {
      task.splice(i, 1);
      break;
    }
  }

  res.redirect("/");
});
