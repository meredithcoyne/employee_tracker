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