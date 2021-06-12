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
            `Update department`,
            `Update role`,
            `Update employee info`,
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

module.exports = {
    employeePrompts,
    newDepartmentPrompts,
    newRolePrompts
}