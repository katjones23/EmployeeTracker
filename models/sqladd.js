const mysql = require('mysql')

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

function Add() {
    this.department = function (answers) {
        try {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answers.deptName
                },
                function (err, res) {
                    if (err) throw err;

                    connection.query("SELECT * FROM department", function (err, res) {
                        if (err) throw err;

                        let values = [];

                        for (let i = 0; i < res.length; i++) {
                            let ID = res[i].id;
                            let Department = res[i].name;
                            values.push({ ID, Department })
                        }

                        console.table(['Departments'], values);
                    });
                });
        }
        catch (err) {
            throw err;
        }
    };

    this.role = function (answers) {
        try {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answers.roleTitle,
                    salary: answers.salary,
                    department_id: answers.deptID
                },
                function (err, res) {
                    if (err) throw err;

                    connection.query("SELECT * FROM role", function (err, res) {
                        if (err) throw err;

                        let values = [];

                        for (let i = 0; i < res.length; i++) {
                            let ID = res[i].id;
                            let Role = res[i].title;
                            let Salary = res[i].salary;
                            let DepartmentID = res[i].department_id;
                            values.push({ ID, Role, Salary, DepartmentID })
                        }

                        console.table(['Roles'], values);
                    });
                });
        }
        catch (err) {
            throw err;
        }
    };

    this.employee = function (answers) {
        try {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleID,
                    manager_name: answers.manager
                },
                function (err, res) {
                    if (err) throw err;

                    connection.query("SELECT * FROM employee", function (err, res) {
                        if (err) throw err;

                        let values = [];

                        for (let i = 0; i < res.length; i++) {
                            let ID = res[i].id;
                            let FirstName = res[i].first_name;
                            let LastName = res[i].last_name;
                            let RoleID = res[i].role_id;
                            let Manager = res[i].manager_name;
                            values.push({ ID, FirstName, LastName, RoleID, Manager })
                        }

                        console.table(['Employees'], values);
                    });
                });
        }
        catch (err) {
            throw err;
        }
    };
}

module.exports = Add