const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
// /require("dotenv").config();

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
      } else if (choice.menu === "view all employees") {
        apiEmployees();
      } else if (choice.menu === "add a department") {
        addDep();
      } else {
        return;
      }
    });
}

function apiDeps() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    start();
  });
}

function apiRoles() {
  db.query(
    "SELECT role.title AS Title, role.id AS RoleID, department.name AS Department, role.salary as Salary FROM role INNER JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.table(results);
      start();
    }
  );
}

function apiEmployees() {
  db.query(
    "SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title as Title, department.name as Department, role.salary as Salary, employee.manager_id as Manager FROM employee INNER JOIN role ON role.id = employee.id INNER JOIN department ON role.department_id = department.id",

    function (err, results) {
      console.table(results);
      start();
    }
  );
}

function addDep() {
  inquirer
    .prompt([
      {
        type: "listinput",
        name: "addDep",
        message: "Please enter a name for the new department",
      },
    ])
    .then((choice) => {
      db.query(
        "insert into department ( name ) values (?)",
        choice.addDep,
        function (err, results) {
          console.log("Added " + choice.addDep + " to the database");
          start();
        }
      );
    });
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`);
});

start();

module.exports = "server.js";
