const { prompt} = require ("inquirer");
const logo = require ("asciiart-logo");
const db = require ("./db");
require("console.table");

init();

//display logo text, load main prompts
function init() {
    const logoText = logo({name: "Employee Manager"}).render();

    console.log(logoText);

    loadMainPrompts();
}