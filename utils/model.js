const inquirer = require('inquirer');

const EmployeeManager = require('./EmployeeManager');

function Model() {
    this.database = require('../config/connection');
} 

Model.prototype.listAllDepartments = function(callback) {
    console.log(`Retrieving all departments...`);
    this.database.query(`
    SELECT department_id AS 'Department Id',
        departments.department_name as Department
    FROM
        departments;
    `,
    (err,res) => {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.listAllRoles = function(callback) {
    console.log(`\n\nRetrieving all roles...\n\n`);
    this.database.query(`
    SELECT roles.role_id as 'Role Id',
        roles.role_title as 'Role Title',
        CONCAT('$ ',FORMAT(roles.role_salary,0)) AS Salary,
        departments.department_name as 'Department'
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.department_id;
    `,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
};

Model.prototype.listAllRolesLite = function(callback) {
    this.database.query(`
    SELECT roles.role_id as 'Role Id',
        roles.role_title as 'Role Title'
    FROM roles;
    `,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
};

Model.prototype.listAllEmployees = function(callback) {
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
            console.log(err);
            return err;
        }
        return callback(res);
    });
};

Model.prototype.listAllEmployeesLite = function(callback) {
    this.database.query(`
    SELECT employees.id as Id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', 
        roles.role_title AS 'Title',  
        departments.department_name as Department
    FROM
        employees
    LEFT JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id = departments.department_id;`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
};

Model.prototype.addDepartment = function(department, callback) {
    console.log(`\nAdding new department: [ ${department} ]`);
    this.database.query(`
    INSERT INTO departments (department_name) 
    VALUES ('${department}');`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.addRole = function(role, department, callback) {
    console.log(`\nAdding new role: [ ${role.role_title} ]`);
    console.log(department);
    let deptId = department.split(":", 1);
    this.database.query(`
    INSERT INTO roles (role_title, role_salary, department_id) 
    VALUES ('${role.role_title}','${role.salary}',${deptId});`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.addEmployee = function(employee, role, manager, callback) {
    console.log(`\nAdding new employee: [ ${employee.first_name} ${employee.last_name} ]`);
    let roleId = role.role.split(":", 1);
    let managerId = manager.manager.split(":", 1);
    this.database.query(`
    INSERT INTO employees (first_name, last_name, role_id, manager_id) 
    VALUES ('${employee.first_name}','${employee.last_name}',${roleId},${managerId});`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.updateEmployeeRole = function(employee, role, callback) {
    console.log(`\nUpdating employee: [ ${employee} ]`);
    let id = employee.split(":", 1);
    let roleId = role.split(":", 1);
    this.database.query(`
    UPDATE employees SET role_id = '${roleId}' WHERE (id = '${id}');
    `,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.updateEmployeeManager = function(employee, manager, callback) {
    console.log(`\nUpdating employee: [ ${employee} ]`);
    let id = employee.split(":", 1);
    let managerId = manager.split(":", 1);
    this.database.query(`
    UPDATE employees SET manager_idd = '${managerId}' WHERE (id = '${id}');
    `,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}


Model.prototype.deleteDepartment = function(department, callback) {
    
    console.log(`\nDeleting department: [ ${department}]`);
    let id = department.split(":", 1);
    this.database.query(`
    DELETE FROM departments  
    WHERE department_id = '${id}';`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.deleteRole = function(role, callback) {
    
    console.log(`\nDeleting role: [ ${role}]`);
    let id = role.split(":", 1);
    this.database.query(`
    DELETE FROM roles  
    WHERE role_id = '${id}';`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

Model.prototype.deleteEmployee = function(employee, callback) {
    
    console.log(`\nDeleting employee: [ ${employee} ]`);
    let id = employee.split(":", 1);
    this.database.query(`
    DELETE FROM employees  
    WHERE id = '${id}';`,
    function (err,res) {
        if (err) {
            console.log(err);
            return err;
        }
        return callback(res);
    });
}

module.exports = Model;