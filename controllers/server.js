/*
Add role, employees

Update employee, roles
*/

require('dotenv').config()
const mysql = require('mysql')
const inquirer = require('inquirer')
const consoleTable = require('console.table')
const View = require('../models/sqlview.js');
const Add = require('../models/sqladd.js')

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
        choices: ['View departments', 'View employees', 'View roles', 'Add department', 'Add role', 'Add employee', 'Update employee', 'Update role', 'Exit'],
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