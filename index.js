const inquirer = require('inquirer');
const db = require('./db/connection');
const conTabl = require ('console.table');

//connect to database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});
mainPrompt();
//main prompt at the beggining of aplication
const mainPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message:"Employee Tracker, please choose one og the following option",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }
    ])
    .then (response => {
        const choice = (response.prompt).toString();

        if (choice === "View all departments") {
            viewAllDepartments();
        } else if (choice === "View all roles") {
            viewAllRoles ();
        } else if (choice === "View all employees") {
            viewAllEmployees();
        } else if (choice === "Add a department") {
            addDepartment();
        } else if (choice === "Add a role") {
            addRole();
        } else if (choice === "Add an employee") {
            addEmployee();
        } else if (choice === "Update an employee role") {
            updateEmployeeRole()
        }
    });
};

