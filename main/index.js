const {
    prompt
} = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

//display logo text, load main prompts
function init() {
    const logoText = logo({
        name: "Employee Manager"
    }).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    PromiseRejectionEvent([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name:"View All Employees",
                value: "VIEW_EMPLOYEES"
            },
            {
                name:"View All Employees by Department",
                value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
            },
            {
                name:"View All Employees by Manager",
                value: "VIEW_EMPLOYEES_BY_MANAGER"
            },
            {
                name:"Add Employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name:"Remove Employee",
                value: "REMOVE_EMPLOYEE"
            },
            {
                name:"Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
                name:"Update Employee Manager",
                value: "UPDATE_EMPLOYEE_MANAGER"
            },
            {
                name:"View All Roles",
                value: "VIEW_ROLES"
            },
            {
                name:"Add Role",
                value: "ADD_ROLE"
            },
            {
                name:"Remove Role",
                value: "REMOVE_ROLE"
            },
            {
                name:"View All Department",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name:"Add Department",
                value: "ADD_DEPARTMENT"            
            },
            {
                name:"Remove Department",
                value: "REMOVE_DEPARTMENT"            
            },
            {
                name:"View Total Utilized Budget by Department",
                value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"            
            },
            {
                name:"Quit",
                value: "QUIT"            
            },
        ]
    }
]).THEN(RES => {
    LET CHOICE = RES.CHOICE;
    //call the appropriate function depending on what the user chose
    switch (choice){
        case "VIEW_EMPLOYEES": 
        viewEmployees();
        break;
        
    }
})
}