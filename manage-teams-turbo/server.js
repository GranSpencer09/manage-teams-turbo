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
    password: "",
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
      } else if (choice.menu === "add a role") {
        addRole();
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
        "insert into department (name) values (?)",
        choice.addDep,
        function (err, results) {
          console.log("Added " + choice.addDep + " to the database");
          apiDeps();
        }
      );
    });
}

// not able to add yet
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Please enter a name for the new role",
      },
      {
        type: "number",
        name: "roleSalary",
        message:
          "Please enter a salary for the new role. No commas or dollar signs",
      },
    ])
    .then((choice) => {
      const choices = [choice.roleName, choice.roleSalary];

      db.query("select name, id from department", function (err, results) {
        const departments = results.map(({ id, name }) => ({
          name: name,
          id: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleDep",
              message: "Please enter a department for the new role",
              choices: departments,
            },
          ])
          .then((choice) => {
            choices.push(choice.roleDep);
            //console.log(choices); this has all three answers
            db.query(
              "insert into role (title, salary, department_id) values (?, ?, ?)",
              choices,
              function (err, results) {
                console.log("Added the new role to " + choice.roleDep);
                apiRoles();
              }
            );
          });
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empFName",
        message: "Please enter a first name for the new employee",
      },
      {
        type: "input",
        name: "empLName",
        message: "Please enter a last name for the new employee",
      },
    ])
    .then((choice) => {
      const choices = [choice.empFName, choice.empLName];

      db.query("select name from role", function (err, results) {
        const roles = results.map(({ name }) => ({
          name: name,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "empRole",
              message: "Please enter a role for the new employee",
              choices: roles,
            },
          ])
          .then((choice) => {
            choices.push(choice.empRole);

            db.query(
              "select (concatenate first_name + last_name as name) from employee where manager_id is not null",
              function (err, results) {
                const managers = results.map(({ manager_id }) => ({
                  name: name,
                }));
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "empManagers",
                      message: "Who is the employee's manager",
                      choices: managers,
                    },
                  ])
                  .then((choice) => {
                    choices.push(choice.empMangers);
                    db.query(
                      "insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
                      choices,
                      function (err, results) {
                        console.log("Added the new employee");

                        apiRoles();
                      }
                    );
                  });
              }
            );
          });
      });
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
