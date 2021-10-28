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
    }).then((answer) =>  {
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
    inquirer.prompt([
        {
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
        },
    ]).then(answer => {
        connection.query(
            "Insert into department set?",
            {
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