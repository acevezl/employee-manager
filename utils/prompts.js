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
            `Exit Employee Manager`
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

module.exports = {
    employeePrompts,
    newDepartmentPrompts
}