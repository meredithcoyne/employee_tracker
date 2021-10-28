const inquirer = require("inquirer");
const mysql = require("mysql");
const db = require("./db");
require("console.table");

init();

var figlet = require('figlet');

figlet('Employee \n \n Manager', function (err, data) {
    if (err) throw err;
    console.log(data);
})

// questions prompting user to answer
function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [{
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
            },

            {
                name: "Add Employee",
                value: "ADD_EMPLOYEE"
            },

            {
                name: "Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"
            },

            {
                name: "View All Roles",
                value: "VIEW_ROLES"
            },

            {
                name: "Add Role",
                value: "ADD_ROLE"
            },

            {
                name: "View All Department",
                value: "VIEW_DEPARTMENTS"
            },

            {
                name: "Add Department",
                value: "ADD_DEPARTMENT"
            },

            {
                name: "Quit",
                value: "QUIT"
            }

        ]
    }).then((answer) => {
        switch (answer.action) {
            case "View all departments":
                viewDepartment();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmployees();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Update employee role":
                updateEmployeeRole();
                break;

            case "Quit":
                connection.end();
                break;
        }
    });
}

// function to View all departments,
function viewDepartment() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Viewing All Departments:");
        console.table(data);
        start();
    });
}

// function to View all roles
function viewRoles() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("Viewing All Roles:");
        console.table(data);
        start();
    });
}

// function to View all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Viewing All employees:");
        console.table(data);
        start();
    });
}

// function to Add a department
function addDepartment() {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "What is the new department name?",
        validate: (value) => {
            if (value) {
                return true;
            } else {
                console.log("Please enter department name.");
            }
        }
    }, ]).then(answer => {
        connection.query(
            "Insert into department set?", {
                name: answer.department
            },
            (err) => {
                if (err) throw err;
                console.log(`New department ${answer.department} has been added!`);
                start();
            }
        );
    });
}

// function to Add a role. Prompts users to input role, salary and department
function addRole() {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([{
                name: "title",
                type: "input",
                message: "What is the title for the new role?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the title.");
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: "What is this new role's salary?",
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("Please enter a number");
                }
            },
            {
                name: "department",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    return choiceArray;
                },
                message: "What department is this new role under?",
            }
        ]).then(answer => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.department) {
                    chosenDept = results[i];
                }
            }

            connection.query(
                "Insert into role set?", {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: chosenDept.id
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New role ${answer.title} has been added!`);
                    start();
                }
            )
        });
    });
}

// function to Add an employee
function addEmployee() {
    const sql = "SELECT * FROM employee, role";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([{
                name: "firstName",
                type: "input",
                message: "What is the first name?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the first name.");
                    }
                }
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the last name.");
                    }
                }
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    //remove duplicates
                    let cleanChoiceArray = [...new Set(choiceArray)];
                    return cleanChoiceArray;
                },
                message: "What is the role?"
            }
        ]).then(answer => {
            let chosenRole;

            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            connection.query(
                "INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: chosenRole.id,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New employee ${answer.firstName} ${answer.lastName} has been added! as a ${answer.role}`);
                    start();
                }
            )
        });
    });
}

// function to Update employee role
function updateEmployeeRole() {
    connection.query("SELECT * FROM employee, role", (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "employee",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].last_name);
                    }
                    //remove duplicates
                    let cleanChoiceArray = [...new Set(choiceArray)];
                    return cleanChoiceArray;
                },
                message: "Which employee would you like to update?"
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
                    //remove duplicates
                    let cleanChoiceArray = [...new Set(choiceArray)];
                    return cleanChoiceArray;
                },
                message: "What is the employee's new role?"
            }
        ]).then(answer => {
            let chosenEmployee;
            let chosenRole;

            for (let i = 0; i < results.length; i++) {
                if (results[i].last_name === answer.employee) {
                    chosenEmployee = results[i];
                }
            }

            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            connection.query(
                "Update employee set? Where?",
                [
                    {
                        role_id: chosenRole,
                    },
                    {
                        last_name: chosenEmployee,
                    }
                ],
                (err) => {
                    if (err) throw err;
                    console.log(`Role has been updated!`);
                    start();
                }
            )
        })
    })
}