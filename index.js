const inquirer = require('inquirer');
const db = require('./db/connection');
const conTabl = require ('console.table');

//connect to database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

//main prompt at the beggining of aplication
const mainPrompt = () => {
    return inquirer.prpmpt([
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
};