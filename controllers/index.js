require('dotenv').config()
const mysql = require('mysql')
const inquirer = require('inquirer')
const consoleTable = require('console.table')
const View = require('../models/sqlview.js');
const Add = require('../models/sqladd.js')
const Update = require('../models/sqlupdate.js')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'emptracker_db'
});

connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

const startApp = function () {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View departments', 'View employees', 'View roles', 'Add department', 'Add role', 'Add employee', 'Update role', 'Update employee', 'Exit'],
    })
        .then(answers => {
            switch (answers.action) {
                case 'View departments':
                    viewDepartments();
                    break;

                case 'View employees':
                    viewEmployees();
                    break;

                case 'View roles':
                    viewRoles();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Update role':
                    updateRole();
                    break;

                case 'Update employee':
                    updateEmployee();
                    break;

                case 'Exit':
                    process.exit();
            };
        })
        .catch(error => console.log(error));
};

function viewDepartments() {
    let viewQuery = new View();
    viewQuery.departments();
    setTimeout(startApp, 2000)
};

function viewEmployees() {
    let viewQuery = new View();
    viewQuery.employees();
    setTimeout(startApp, 2000)
};

function viewRoles() {
    let viewQuery = new View();
    viewQuery.roles();
    setTimeout(startApp, 2000)
};

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'What is the new department\'s name?',
    })
        .then(answers => {
            let addQuery = new Add();
            addQuery.department(answers);
            setTimeout(startApp, 2000)
        })
};

function addRole() {
    let questions = [
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the new role\'s title?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the new role\'s salary?',
        },
        {
            type: 'input',
            name: 'deptID',
            message: 'What is the new role\'s department ID?',
        }
    ];

    inquirer.prompt(questions).then(answers => {
        let addQuery = new Add();
        addQuery.role(answers);
        setTimeout(startApp, 2000)
    })
};

function addEmployee() {
    let questions = [
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the new employee\'s first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the new employee\'s last name?',
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'What is the new employee\'s role ID?',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is the new employee\'s manager?',
        }
    ];

    inquirer.prompt(questions).then(answers => {
        let addQuery = new Add();
        addQuery.employee(answers);
        setTimeout(startApp, 2000)
    })
};

function updateRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        let questions = [
            {
                type: 'rawlist',
                name: 'choice',
                choices: function () {
                    let choices = [];
                    for (let i = 0; i < res.length; i++) {
                        choices.push(res[i].title);
                    }
                    return choices;
                },
                message: 'Which role would you like to update?'
            },
            {
                type: 'list',
                name: 'column',
                message: 'Which column would you like to update?',
                choices: ['Title', 'Salary', 'Department_ID']
            },
            {
                type: 'input',
                name: 'newValue',
                message: 'What is the new value?'
            }
        ];

        inquirer.prompt(questions).then(answers => {
            let selectedRole;
            for (let i = 0; i < res.length; i++) {
                if (res[i].title === answers.choice) {
                    selectedRole = res[i].id;
                }
            };

            if (answers.column === 'Title') {
                answers.newValue = "'" + answers.newValue + "'"
            }

            let updateQuery = new Update();
            updateQuery.role(selectedRole, answers);
            setTimeout(startApp, 2000)
        });
    })
};

function updateEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        let questions = [
            {
                type: 'rawlist',
                name: 'choice',
                choices: function () {
                    let choices = [];
                    for (let i = 0; i < res.length; i++) {
                        let employeeName = res[i].first_name + " " + res[i].last_name;
                        choices.push(employeeName);
                    }
                    return choices;
                },
                message: 'Which employee would you like to update?'
            },
            {
                type: 'list',
                name: 'column',
                message: 'Which column would you like to update?',
                choices: ['First_Name', 'Last_Name', 'Role_ID', 'Manager_Name']
            },
            {
                type: 'input',
                name: 'newValue',
                message: 'What is the new value?'
            }
        ];

        inquirer.prompt(questions).then(answers => {
            console.log(answers.choice)

            let selectedEmployee;
            for (let i = 0; i < res.length; i++) {
                if ((res[i].first_name + " " + res[i].last_name) === answers.choice) {
                    selectedEmployee = res[i].id;
                }
            };

            if (answers.column === 'First_Name' || answers.column === 'Last_Name' || answers.column === 'Manager_Name') {
                answers.newValue = "'" + answers.newValue + "'"
            }

            let updateQuery = new Update();
            updateQuery.employee(selectedEmployee, answers);
            setTimeout(startApp, 2000)
        });
    })
};