const inquirer = require("inquirer");

const employeePrompts = [
    {
        type: 'list',
        name: 'action',
        message: `What would you like to do?`,
        choices: [
            `List all departments`, 
            `List all roles`, 
            `List all employees`,
            `Add a department`, 
            `Add a role`, 
            `Add an employee`, 
            `Update employee role`,
            `Update employee manager`,
            `Delete department`,
            `Delete role`,
            `Delete employee`,
            new inquirer.Separator(),
            `Exit Employee Manager`,
            new inquirer.Separator()
        ],
        pageSize: 13
    }
];

const newDepartmentPrompts = [
    {
        type: 'input',
        name: 'department',
        message: `Type the name of the new department:`,
    }
];

const newRolePrompts = [
    {
        type: 'input',
        name: 'role_title',
        message: `Type the name of the new role:`,
    },
    {
        type: 'input',
        name: 'salary',
        message: `Type the salary of the new role:`,
    }
];

const newEmployeePrompts = [
    {
        type: 'input',
        name: 'first_name',
        message: `Type the employee's first name:`,
    },
    {
        type: 'input',
        name: 'last_name',
        message: `Type the employee's last name:`,
    }
];
module.exports = {
    employeePrompts,
    newDepartmentPrompts,
    newRolePrompts,
    newEmployeePrompts
}