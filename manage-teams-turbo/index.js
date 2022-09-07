const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");
const server = require("./server");
const express = require("express");

// // function apiDeps() {}

// function start() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "menu",
//         message: "This is the main menu, select an option",
//         choices: [
//           "view all departments",
//           "view all roles",
//           "view all employees",
//           "add a department",
//           "add a role",
//           "add an employee",
//           "update an employee role",
//           "quit",
//         ],
//       },
//     ])
//     .then((choice) => {
//       if (choice.menu === "view all departments") {
//         db.query("SELECT * FROM department", function (err, results) {
//           console.log(results);
//         });
//       } else {
//         return;
//       }
//     });

//   // .catch((error) => {
//   //   if (error.isTtyError) {
//   //     // Prompt couldn't be rendered in the current environment
//   //   }
//   // });
// }

// start();
