/*
Build a command-line application that at a minimum allows the user to:

Add departments, roles, employees

View departments, roles, employees

Update employee roles

Bonus points if you're able to:

Update employee managers

View employees by manager

Delete departments, roles, and employees

View the total utilized budget of a department -- ie the combined salaries of all employees in that department

You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

You will need to perform a variety of SQL JOINS to complete this assignment
*/

require('dotenv').config()
const mysql = require('mysql')
const inquirer = require('inquirer')
const consoleTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'emptracker_db'
});

connection.connect(function (err) {
    if (err) throw err;
});

inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View departments', 'View employees', 'View roles', 'Add department', 'Add employee', 'Add role', 'Update employee', 'Update role', 'Exit'],
})
    .then(answers => {
        // SQL behaviors
    });