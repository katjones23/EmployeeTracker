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

function Update() {
    this.role = function (selectedRole, answers) {
        try {
            let query = "UPDATE role SET " + answers.column + " = " + answers.newValue + " WHERE id = " + selectedRole;

            connection.query(query, function (err, res) {
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

    this.employee = function (selectedEmployee, answers) {
        try {
            let query = "UPDATE employee SET " + answers.column + " = " + answers.newValue + " WHERE id = " + selectedEmployee;

            connection.query(query, function (err, res) {
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

module.exports = Update