const Model = require('./Model');
const inquirer = require('inquirer');
const cTable = require('console.table');
const consoleReader = require('wait-console-input');

function EmployeeManager() {
    this.database = require('../config/connection');
    this.model = new Model();
    this.prompts = require('./prompts');
    this.exit = false;
    this.logo = `
    ________ ____    ____ _______ _____      ___   ____  ___ ________ ________     
   |_   __  |_   \\  /   _|_   __ \\_   _|   .'   \`.|_  _||_ _|_   __  |_   __  |    
     | |_ \_|  |   \\/   |   | |__) || |    /  .-.  \\ \\ \\  //   | |_ \\_| | |_ \\_|    
     |  _| _  | |\\  /| |   |  ___/ | |   _| |   | |  \\ \\//    |  _| _  |  _| _     
    _| |__/ |_| |_\\/_| |_ _| |_   _| |__/ \\  \`-'  / _|  |_   _| |__/ |_| |__/ |    
   |________|_____||_____|_____| |________|\`.___.' |______| |________|________|    
                                                                                    
    ____    ____      _      ____  _____      _        ______  ________ _______     
   |_   \\  /   _|    / \\    |_   \\|_   _|    / \\     .' ___  ||_   __  |_   __ \\    
     |   \\/   |     / _ \\     |   \\ | |     / _ \\   / .'   \\_|  | |_ \_|  | |__) |   
     | |\\  /| |    / ___ \\    | |\\ \\| |    / ___ \\  | |   ____  |  _| _  |  __ /    
    _| |_\\/_| |_ _/ /   \\ \\_ _| |_\\   |_ _/ /   \\ \\_\\ \`.___]  |_| |__/ |_| |  \\ \\_  
   |_____||_____|____| |____|_____|\\____|____| |____|\`._____.'|________|____| |___|                         
   
   `;
}

EmployeeManager.prototype.init = function() {
    console.clear();
    console.log(this.logo);
    this.loadMenu();
}

EmployeeManager.prototype.loadMenu = function() {
    inquirer.prompt(
        this.prompts.employeePrompts
    ).then(answer => {
        switch (answer.action) {
            case 'List all departments':
                this.listAllDepartments();
                break;
            case 'List all roles':
                this.listAllRoles();
                break;
            case 'List all employees':
                this.listAllEmployees();
                break;
            case 'Add a department':
                this.addDepartment();
                break;
            case 'Add a role':
                this.addRole();
                break;
            case 'Add an employee':
                this.addEmployee();
                break;
            case 'Update employee role':
                this.updateEmployeeRole();
                break;
            case 'Update employee manager':
                this.updateEmployeeManager();
                break;
            case 'Delete department':
                this.deleteDepartment();
                break;
            case 'Delete role':
                this.deleteRole();
                break;
            case 'Delete employee':
                this.deleteEmployee();
                break;
            case 'Exit Employee Manager':
                process.exit();
        }
    })
    .catch(error => {
        if(error.isTtyError) {
            console.log('Prompt couldn\'t be rendered');
        } else {
            console.log(error);
        }
    });
} 

EmployeeManager.prototype.listAllDepartments = function() {
    this.model.listAllDepartments((result)=>{
        console.clear();
        console.table(result);
        consoleReader.wait('Return to main menu: ');
        this.init();
    });
}

EmployeeManager.prototype.listAllRoles = function() {
    this.model.listAllRoles((result)=>{
        console.clear();
        console.table(result);
        consoleReader.wait('Return to main menu: ');
        this.init();
    });
}

EmployeeManager.prototype.listAllEmployees  = function() {
    this.model.listAllEmployees((result)=>{
        console.clear();
        console.table(result);
        consoleReader.wait('Return to main menu: ');
        this.init();
    });
}

EmployeeManager.prototype.addDepartment = function() {
    inquirer.prompt(
        this.prompts.newDepartmentPrompts
    )
    .then(answer => {
        this.model.addDepartment(answer.department, callback => {
            this.listAllDepartments();
        });
    })
    .catch(error => {
        if(error.isTtyError) {
            console.log('Prompt couldn\'t be rendered');
        } else {
            console.log(error);
        }
    });
}

EmployeeManager.prototype.addRole = function() {
    
    this.model.listAllDepartments((departments)=>{
        inquirer.prompt(
            this.prompts.newRolePrompts
        )
        .then(answer => {
            inquirer.prompt(
                {
                    type:'list',
                    name: 'department',
                    message: `Select the department to which this role belongs:`,
                    choices: this.listify(departments)
                }
            )
            .then( department => {
                this.model.addRole(answer, department.department, callback => {
                    this.listAllRoles();
                });
            });
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.addEmployee = function() {
    
    this.model.listAllRolesLite((roles)=>{
        inquirer.prompt(
            this.prompts.newEmployeePrompts
        )
        .then(answer => {
            inquirer.prompt(
                {
                    type:'list',
                    name: 'role',
                    message: `Select the role of this employee:`,
                    choices: this.listify(roles)
                }
            )
            .then( role => {
                this.model.listAllEmployeesLite((managers) => {
                    inquirer.prompt(
                        {
                            type: 'list',
                            name: 'manager',
                            message: `Select the manager of this employee: `,
                            choices: this.listify(managers) 
                        }
                    )
                    .then(manager => {
                        this.model.addEmployee(answer, role, manager, callback => {
                            this.listAllEmployees();
                        });
                    })
                })
            });
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.updateEmployeeRole = function() {
    
    this.model.listAllEmployeesLite((employees)=>{
        inquirer.prompt(
            {
                type: 'list',
                name: 'employee',
                message: 'Select the employee to modify from the list below:',
                choices: this.listify(employees)
            }
        )
        .then(answer => {
            this.model.listAllRolesLite((roles)=>{
                inquirer.prompt(
                    {
                        type:'list',
                        name: 'role',
                        message: `Select the new role for this employee:`,
                        choices: this.listify(roles)
                    }
                )
                .then( newRole => {
                    if (newRole.manager === 'None, return to main menu') {
                        this.init();
                    } else {
                        this.model.updateEmployeeRole(answer.employee, newRole.role, callback => {
                            this.listAllEmployees();
                        });
                    }
                      
                })
            })
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.updateEmployeeManager = function() {
    
    this.model.listAllEmployeesLite((employees)=>{
        inquirer.prompt(
            {
                type: 'list',
                name: 'employee',
                message: 'Select the employee to modify from the list below:',
                choices: this.listify(employees)
            }
        )
        .then(answer => {
            inquirer.prompt(
                {
                    type:'list',
                    name: 'manager',
                    message: `Select the new manager for this employee:`,
                    choices: this.listify(employees)
                }
            )
            .then( newManager => {
                if (newManager.manager === 'None, return to main menu') {
                    this.init();
                } else {
                    this.model.updateEmployeeManager(answer.employee, newManager.manager, callback => {
                        this.listAllEmployees();
                    });
                }
                    
            })
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.deleteDepartment = function() {
    
    this.model.listAllDepartments((results)=>{
        
        inquirer.prompt(
            {
                type: 'list',
                name: 'department',
                message: `Select department to delete:`,
                choices: this.listify(results)
            }
        )
        .then(answer => {
            if (answer.department === 'None, return to main menu') {
                this.init();
            } else {
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    message: 'If an employee belongs to this department, the employee record will be updated to Department = NULL.\nThis action cannot be undone. Are you sure?'
                })
                .then (confirm => {
                    if (confirm.confirmDelete) {
                        this.model.deleteDepartment(answer.department, callback => {
                            this.listAllDepartments();
                        });
                    } else {
                        this.deleteDepartment();
                    }
                });
            }
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.deleteRole = function() {
    
    this.model.listAllRolesLite((results)=>{
        
        inquirer.prompt(
            {
                type: 'list',
                name: 'role',
                message: `Select department to delete:`,
                choices: this.listify(results)
            }
        )
        .then(answer => {
            if (answer.role === 'None, return to main menu') {
                this.init();
            } else {
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    message: 'If an employee has this role, the employee record will be updated to Role = NULL.\nThis action cannot be undone. Are you sure?'
                })
                .then (confirm => {
                    if (confirm.confirmDelete) {
                        this.model.deleteRole(answer.role, callback => {
                            this.listAllRoles();
                        });
                    } else {
                        this.deleteRole();
                    }
                });
            }
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.deleteEmployee = function() {
    
    this.model.listAllEmployeesLite((results)=>{
        
        inquirer.prompt(
            {
                type: 'list',
                name: 'employee',
                message: `Select employee to delete:`,
                choices: this.listify(results)
            }
        )
        .then(answer => {
            if (answer.role === 'None, return to main menu') {
                this.init();
            } else {
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    message: 'This action cannot be undone. Are you sure?'
                })
                .then (confirm => {
                    if (confirm.confirmDelete) {
                        this.model.deleteEmployee(answer.employee, callback => {
                            this.listAllEmployees();
                        });
                    } else {
                        this.deleteEmployee();
                    }
                });
            }
        })
        .catch(error => {
            if(error.isTtyError) {
                console.log('Prompt couldn\'t be rendered');
            } else {
                console.log(error);
            }
        });
    });
}

EmployeeManager.prototype.listify = function (results) {
    let list = [];
    Array.prototype.forEach.call(results, object => {
        let listItem = '';
        for (const property in object) {
            listItem += `${object[property]}:`
        }
        list.push(listItem.substr(0,listItem.length-1));
    });
    list.push(new inquirer.Separator());
    list.push(`None, return to main menu`);
    list.push(new inquirer.Separator());
    return list;
}

module.exports = EmployeeManager;