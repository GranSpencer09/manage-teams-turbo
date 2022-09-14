const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/DB");

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
      } else if (choice.menu === "add an employee") {
        addEmployee();
      } else {
        return;
      }
    });
}

function apiDeps() {
  db.apiDeps().then(([result]) => {
    console.table(result);
    start();
  });
}

function apiRoles() {
  db.apiRoles().then(([result]) => {
    console.table(result);
    start();
  });
}

function apiEmployees() {
  db.apiEmployees().then(([result]) => {
    console.table(result);
    start();
  });
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
      db.addDep({ name: choice.addDep }).then(() => {
        console.log(`New department ${choice.addDep} added to database`);
        start();
      });
    });
}

function addRole() {
  db.apiEmployees().then(([result]) => {
    const choices = result.map((department) => ({
      name: department.name,
      value: department.id,
    }));
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
        {
          type: "list",
          name: "roleDep",
          message: "Please select a department for the new role",
          choices: choices,
        },
      ])
      .then((answer) => {
        db.addRole({
          title: answer.roleName,
          salary: answer.roleSalary,
          department_id: answer.roleDep,
        }).then(() => {
          console.log(`The role of ${answer.roleName} is in the database`);
          start();
        });
      });
  });
}

function addEmployee() {
  db.apiRoles().then(([result]) => {
    const roles = result.map((role) => ({
      name: role.Title,
      value: role.RoleID,
    }));

    db.apiEmployees().then(([result]) => {
      const employees = result.map((employee) => ({
        name: `${employee.FirstName} ${employee.LastName}`,
        value: employee.EmployeeID,
      }));

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
          {
            type: "list",
            name: "empRole",
            message: "Please enter a role for the new employee",
            choices: roles,
          },
          {
            type: "list",
            name: "empManagers",
            message: "Who is the employee's manager",
            choices: employees,
          },
        ])
        .then((answers) => {
          db.addEmployee({
            first_name: answers.empFName,
            last_name: answers.empLName,
            role_id: answers.empRole,
            manager_id: answers.empManagers,
          }).then(() => {
            console.log(`${answers.empFName} successfully added`);
            start();
          });
        });
    });
  });
}

// function updateEmployee() {
//   db.apiDeps().then(([result]) => {
//     const choices = result.map((employee) => ({
//       name: employee.name,
//       value: employee.id,
//     }));
// }

start();
