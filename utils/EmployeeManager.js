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
                // Model.addARole();
                break;
            case 'Add an employee':
                // Model.addAnEmployee();
                break;
            case 'Update department name':
                // Model.updateDepartment();
                break;
            case 'Update role name and salary':
                // Model.updateRole();
                break;
            case 'Update employee info':
                // Model.updateEmployee();
                break;
            case 'Delete department':
                // Model.deleteDepartment();
                break;
            case 'Delete role':
                // Model.deleteRole();
                break;
            case 'Delete employee':
                // Model.deleteEmployee();
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
            console.log(callback);
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

module.exports = EmployeeManager;