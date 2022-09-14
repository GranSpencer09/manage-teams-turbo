const db = require("./connection");

class DB {
  constructor(db) {
    this.db = db;
  }

  apiDeps() {
    return this.db.promise().query("SELECT * FROM department");
  }
  apiRoles() {
    return this.db
      .promise()
      .query(
        "SELECT role.id AS RoleID, role.title AS Title, department.name AS Department, role.salary as Salary FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  }
  apiEmployees() {
    return this.db
      .promise()
      .query(
        "SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title as Title, department.name as Department, role.salary as Salary, CONCAT(Manager.first_name, ' ', Manager.last_name) as Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee Manager on Manager.id = employee.manager_id"
      );
  }

  addDep(department) {
    return this.db.promise().query("INSERT INTO department SET ?", department);
  }

  addRole(role) {
    return this.db.promise().query("INSERT INTO role SET ?", role);
  }

  addEmployee(employee) {
    return this.db.promise().query("INSERT INTO employee SET ?", employee);
  }
}

module.exports = new DB(db);
