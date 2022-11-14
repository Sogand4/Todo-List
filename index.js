var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(8080, function () {
  console.log('Server started on port 8080')
});

let task = [];
app.post('/addtask', function (req, res) {
    let newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

app.get("/", function(req, res) {    
  res.render("index", { task: task});
});

app.get("*", function(req, res) {
  res.send("<h1>Invalid Page</h1>");
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