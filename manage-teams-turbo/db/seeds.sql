INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Marketing"),
       (3, "Finance"),
       (4, "Product"),
       (5, "Customer Support");

INSERT INTO role (id, title, salary, department_id)
VALUES (22, "Business Development Rep", "40000", 1),
       (24, "Marketing Associate", "45000", 2),
       (34, "Finance Manager", "80000", 3),
       (44, "Product Manager", "95000", 4),
       (54, "Customer Support Manager", "35000", 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (99, "Big", "Bob", 23),
       (98, "Chubby", "Joe", 24),
       (97, "Dope", "Donna", 34),
       (96, "Prepared", "Pan", 44),
       (95, "Cantkeepup", "Connor", 54);
       
