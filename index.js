const inquirer = require('inquirer');
const db = require('./db/connection');
const chalk = require("chalk");
const viewAll = chalk.black.bgCyan;
const successfullyAdded = chalk.black.bgGreen;
const inputValidation = chalk.black.bgYellow;
const figlet = require('figlet');


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
            name: 'choice',
            message: "Please choose one of the following options",
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
        .then(response => {
            const choice = (response.choice).toString();
            if (choice === "View all departments") {
                viewAllDepartments();
            } else if (choice === "View all roles") {
                viewAllRoles();
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
        console.log(
            (viewAll
                (figlet.textSync('All Departments', { font: 'small', horizontalLayout: 'fitted' })
                )
            )
        );
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
        console.log(
            (viewAll
                (figlet.textSync('All Roles', { font: 'small', horizontalLayout: 'fitted' })
                )
            )
        );
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
        console.log(
            (viewAll
                (figlet.textSync('All Employees', { font: 'small', horizontalLayout: 'full' })
                )
            )
        );
        console.table(result);
        mainPrompt();
    });
};

// "Add a department"
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "Please enter name of new department. (Required)",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log(inputValidation("Please enter new department name."));
                    return false;
                }
            }
        },
    ])
        .then(response => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            db.query(sql, response.addDepartment, (err, results) => {
                if (err) throw err;
                console.log(successfullyAdded ('New department was added.'));
                mainPrompt();
            })
        });
};

// "Add a role"
const addRole = () => {
    const sql = `SELECT * FROM department;`
    const departmentArr = [];
    db.query(sql, (err, roleData) => {
        if (err) throw error;
        roleData.forEach((department) => departmentArr.push(department.name));
    })
    return inquirer.prompt([
        {
            type: 'input',
            name: 'addRoleName',
            message: "Please enter name for new role. (Required)",
            validate: roleNameInput => {
                if (roleNameInput) {
                    return true;
                } else {
                    console.log(inputValidation("Please enter new role name."));
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addRoleSalary',
            message: "Please enter the salary for the new role.",
            validate: roleSalaryInput => {
                if (roleSalaryInput) {
                    if (isNaN(roleSalaryInput)) {
                        console.log(inputValidation("Please enter a numbers only."));
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    console.log(inputValidation("Please enter new role salary."));
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "addRoleDepartment",
            message: "Please select the department for new role.",
            choices: departmentArr
        }
    ])
        .then(response => {
            const responseDept = response.addRoleDepartment;
            let deptID;
            const sqlID = `SELECT * FROM department;`
            db.query(sqlID, (err, result) => {
                if (err) throw err;
                result.forEach((department) => {
                    if (responseDept === department.name) {
                        deptID = department.id;
                    }
                })
                const sql = `INSERT INTO role (title, salary, department_id) 
                        VALUES (?,?,?)`;
                const params = [response.addRoleName, response.addRoleSalary, deptID];
                db.query(sql, params, (err, results) => {
                    if (err) throw err;
                    console.log(successfullyAdded("New role was added"));
                    mainPrompt();
                })
            })
        });
};

//"Add an employee"
const addEmployee = () => {
    const sqlEmpRole = `SELECT * FROM role;`;
    const roleArr = [];
    db.query(sqlEmpRole, (err, roleData) => {
        if (err) throw err;
        roleData.forEach((role) => roleArr.push(role.title));
    })
    //FIRST NAME for new employee
    return inquirer.prompt([
        {
            type: "input",
            name: "addFirstName",
            message: "Please enter new employee's first name. (Required)",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log(inputValidation("You must enter the first name of the new employee."));
                    return false
                }
            }
        },
        //LAST NAME for new employee
        {
            type: 'input',
            name: 'addLastName',
            message: "Please enter new employee's last name. (Required)",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log(inputValidation("You must enter the last name of the new employee."));
                    return false
                }
            }
        },
        // ROLE for new employee
        {
            type: 'list',
            name: 'roleChoice',
            message: "Please select new employee's role.",
            choices: roleArr
        },
    ])
        // MANAGER for new epmloyee
        .then(response => {
            const managerArr = [];
            const roleResponse = response.roleChoice;
            let roleId;
            let managerId;

            const sqlRole = `SELECT * FROM role;`
            db.query(sqlRole, (err, result) => {
                if (err) throw err;
                result.forEach((role) => {
                    if (roleResponse === role.title) {
                        roleId = role.id
                    }
                })
                sqlManager = `SELECT * FROM employee;`;
                db.query(sqlManager, (err, managerData) => {
                    if (err) throw err;
                    const manager = managerData.map(({ first_name, last_name }) =>
                        ({ name: first_name + ' ' + last_name }));
                    return inquirer.prompt([
                        {
                            type: "list",
                            name: "managerChoice",
                            message: "Please select new employee's manager.",
                            choices: manager
                        }
                    ])
                        .then(managerResult => {
                            const managerResponse = managerResult.managerChoice;

                            firstName = managerResponse.split(' ')[0];
                            lastName = managerResponse.split(' ').pop();
                            managerData.forEach((employee) => {
                                if ((firstName === employee.first_name) && (lastName === employee.last_name)) {
                                    managerId = employee.id;
                                }
                            })
                            //add new employee
                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                   VALUES (?,?,?,?)`;
                            const params = [response.addFirstName, response.addLastName, roleId, managerId];
                            db.query(sql, params, (err, results) => {
                                if (err) throw err;
                                console.log(successfullyAdded("New employee was added"));
                                mainPrompt();
                            })
                        })
                })
            })
        });
};

//"Update an employee role"
const updateEmployeeRole = () => {
    const employeeArr = [];
    const roleArr = [];
    let employeeID;
    let roleID;
    const sqlEmployee = `SELECT * FROM employee;`;
    const sqlRole = `SELECT * FROM role;`;

    db.query(sqlEmployee, (err, employeeData) => {
        if (err) throw err;
        employeeData.forEach((employee) => employeeArr.push(employee.first_name + ' ' + employee.last_name));
        db.query(sqlRole, (err, roleData) => {
            if (err) throw err;
            roleData.forEach((role) => roleArr.push(role.title));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeChoice',
                    message: "Which employee role would you like to update?",
                    choices: employeeArr
                },
                {
                    type: 'list',
                    name: 'roleChoice',
                    message: "Change the employee role to? Please select",
                    choices: roleArr
                }
            ])
                .then(responseData => {
                    const roleResponse = responseData.roleChoice;
                    const employeeResponse = responseData.employeeChoice;
                    let firstName = employeeResponse.split(' ')[0];
                    let lastName = employeeResponse.split(' ').pop();
                    employeeData.forEach((employee) => {
                        if ((firstName === employee.first_name) && (lastName === employee.last_name)) {
                            employeeID = employee.id;
                        }
                    })
                    roleData.forEach((role) => {
                        if (roleResponse === role.title) {
                            roleID = role.id
                        }
                    })
                    const sql = `UPDATE employee SET role_id = ?
                            WHERE id = ?`;
                    const params = [roleID, employeeID];

                    db.query(sql, params, (err, results) => {
                        if (err) throw err;
                        console.log(successfullyAdded("Employee role was updated"));
                        mainPrompt();
                    })
                })
        })
    });
};

mainPrompt();
