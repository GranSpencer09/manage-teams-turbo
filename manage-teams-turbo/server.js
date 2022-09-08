const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "GJUJ66%4#fsU!8rC@F^y#09T",
    database: "thebestcompany_db",
  },
  console.log(`Connected to the books_db database.`)
);

//async
function apiDeps() {
  // Query database
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    start();
  });
}

function apiRoles() {
  // Query database
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    start();
  });
}

// express won't see 404 as an error so we have to explicitly say if nothing gets returned above, return a 404 error
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`);
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "This is the main menu, select an option",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "quit",
        ],
      },
    ])
    .then((choice) => {
      if (choice.menu === "view all departments") {
        apiDeps();
      } else if (choice.menu === "view all roles") {
        apiRoles();
      } else {
        return;
      }
    });
}

start();

module.exports = "server.js";
