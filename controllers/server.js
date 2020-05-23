/*
Add departments, roles, employees

View employees

Update employee roles
*/

require('dotenv').config()
const mysql = require('mysql')
const inquirer = require('inquirer')
const consoleTable = require('console.table')
const View = require('../models/sqlview.js');

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
        choices: ['View departments', 'View employees', 'View roles', 'Add department', 'Add employee', 'Add role', 'Update employee', 'Update role', 'Exit'],
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
}