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
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message:"Employee Tracker, please choose one of the following options",
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
        const choice = (response.choice).toString();

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

// "View all departments"
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department;`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('All Departments');
        console.table(result);
        mainPrompt();
    });
};

//"View all roles"
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                FROM role
                LEFT JOIN department ON department.id = role.department_id;`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('All Roles');
        console.table(result);
        mainPrompt();
    });
};
// "View all employees"
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                role.title AS title,
                department.name AS department, role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN (employee manager) ON manager.id = employee.manager_id
                LEFT JOIN role on employee.role_id = role.id
                LEFT JOIN department ON department.id = role.department_id;`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('All Employees');
        console.table(result);
        mainPrompt();
    });
};

mainPrompt();
