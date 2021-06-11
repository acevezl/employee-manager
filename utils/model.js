const Reader = require('wait-console-input');

function Model() {
    this.database = require('../config/connection');
    this.cTable = require('console.table');
    
} 

Model.prototype.listAllDepartments = function() {
    console.log(`\n\nRetrieving all departments...\n\n`);
    this.database.query(`
    SELECT department_id AS 'Department Id',
        departments.department_name as Department
    FROM
        departments;
    `,
    function (err,res) {
        if (err) {
            return err;
        }
        console.clear();
        console.table(res);
    });
}

Model.prototype.listAllRoles = function() {
    console.log(`\n\nRetrieving all roles...\n\n`);
    this.database.query(`
    SELECT roles.role_id as 'Role Id',
        roles.role_title as 'Role Title',
        roles.role_salary as 'Salary',
        departments.department_name as 'Department'
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.department_id;
    `,
    function (err,res) {
        if (err) {
            return err;
        }
        console.clear();
        console.table(res);
        
    });
};

Model.prototype.listAllEmployees = function() {
    console.log(`\n\nRetrieving all employees...\n\n`);
    this.database.query(`
    SELECT employees.id as Id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', 
        roles.role_title AS 'Title',  
        departments.department_name as Department,
        CONCAT('$ ',FORMAT(roles.role_salary,0)) AS Salary,
        CONCAT(managers.first_name, ' ', managers.last_name) AS 'Manager'
    FROM
        employees
    LEFT JOIN employees AS managers ON managers.id = employees.manager_id
    LEFT JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id = departments.department_id;`,
    function (err,res) {
        if (err) {
            return err;
        }
        console.clear();
        console.table(res);
    });
};

module.exports = Model;