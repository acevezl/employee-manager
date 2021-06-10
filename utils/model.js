// Get MySQL connection
const db = require('./config/connection');

// Include Console.Table to beautify the table outputs
const cTable = require('console.table');

const getAllEmployees = function() {
    return db.query(`
    SELECT employees.first_name, employees.last_name, 
        roles.role_title, roles.role_salary, 
        departments.department_name,
        managers.first_name AS manager_first_name,
        managers.last_name AS manager_last_name,
        employees.created_on,employees.updated_on
    FROM
        employees
    LEFT JOIN employees AS managers ON managers.id = employees.manager_id
    LEFT JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id = departments.department_id;`);
};
