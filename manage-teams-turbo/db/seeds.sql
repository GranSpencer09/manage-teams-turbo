INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Finance"),
       ("Product"),
       ("Customer Support"),
       ("Executives");

INSERT INTO role (title, salary, department_id)
VALUES ("Business Development Rep", "40000", 1),
       ("Marketing Associate", "45000", 2),
       ("Finance Manager", "80000", 3),
       ("Product Manager", "95000", 4),
       ("Customer Support Manager", "35000", 5),
       ("CEO", "95000", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Big", "Bob", 1, 6),
       ("Chubby", "Joe", 2, 3),
       ("Dope", "Donna", 3, NULL),
       ("Prepared", "Pam", 4, 6),
       ("Cantkeepup", "Connor", 5, 6),
       ("Big", "Tuna", 6, NULL);
       
