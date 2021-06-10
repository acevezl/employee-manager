const employeePrompts = [
    {
        type: 'list',
        name: 'action',
        message: `What would you like to do? (Use ↑ and ↓ on your keyboard, then hit enter to make your selection):`,
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
        ]
    }
];

module.exports = {
    employeePrompts
}