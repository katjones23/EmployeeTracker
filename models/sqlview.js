const mysql = require('mysql')
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

function View() {
    this.departments = function () {
        try {
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
        }
        catch (err) {
            throw err;
        }
    };

    this.employees = function () {
        try {
            let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_name, department.name ";
            query += "FROM ((employee INNER JOIN role ON employee.role_id = role.id) ";
            query += "INNER JOIN department ON role.department_id = department.id) ORDER BY employee.id, role.title;";

            connection.query(query, function (err, res) {
                if (err) throw err;

                let values = [];

                for (let i = 0; i < res.length; i++) {
                    let ID = res[i].id;
                    let Name = (res[i].first_name) + " " + (res[i].last_name);
                    let Role = (res[i].title);
                    let Salary = (res[i].salary);
                    let Manager = res[i].manager_name;
                    let Department = res[i].name
                    values.push({ ID, Name, Role, Salary, Manager, Department })
                }

                console.table(['Employees'], values);
            });
        }
        catch (err) {
            throw err;
        }
    };

    this.roles = function () {
        try {
            let query = "SELECT role.id, role.title, role.salary, department.name ";
            query += "FROM role INNER JOIN department ON role.department_id = department.id ";
            query += "ORDER BY role.id";

            connection.query(query, function (err, res) {
                if (err) throw err;

                let values = [];

                for (let i = 0; i < res.length; i++) {
                    let ID = res[i].id;
                    let Role = (res[i].title);
                    let Salary = (res[i].salary);
                    let Department = res[i].name
                    values.push({ ID, Role, Salary, Department })
                }

                console.table(['Roles'], values);
            });
        }
        catch (err) {
            throw err;
        }
    };
}

module.exports = View