USE employee_management_db;

INSERT INTO department(name)
VALUES
    ("Marketing"),
    ("Finance"),
    ("IT"),
    ("Sales"),
    ("Store Team"),
    ("Legal"),

INSERT INTO role(title, salary, department_id)
VALUES
    ("Store Director", 150000, 5),
    ("Sales Manager",75000 , 5),
    ("Omni-marketing Manager", 90000 , 1),
    ("Software Engineer", 105000 , 3),
    ("Accountant", 115000 , 2),
    ("Paralegal",85000, 6),
    ("Lawyer", 200000 , 6),
    ("Buyer", 115000 ,4),
    ("Planner", 115000,4);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Stephanie", "Wynn", 1, NULL),
    ("Shawn", "Layton", 2, 1),
    ("Kristen", "Twomey", 3, NULL),
    ("Jimmy", "Henderickson", 4, NULL),
    ("Joe", "Sellix", 5, NULL),
    ("Hilary", "Grieger", 6, 7),
    ("Sarah", "Haselwood", 7, NULL),
    ("Laken", "Beaumont", 8, NULL),
    ("Marguerite", "Steege", 9, NULL);
 