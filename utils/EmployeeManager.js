const Model = require('./Model');
const inquirer = require('inquirer');

function EmployeeManager() {
    this.model = new Model();
    this.prompts = require('./prompts');
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
                this.model.listAllDepartments();
                break;
            case 'List all roles':
                this.model.listAllRoles();
                break;
            case 'List all employees':
                this.model.listAllEmployees();
                break;
            case 'Add a department':
                //Model.addADepartment();
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
        this.loadMenu();
    })
    .catch(error => {
        if(error.isTtyError) {
            console.log('Prompt couldn\'t be rendered')
        } else {
            console.log(error);
        }
    });
} 

module.exports = EmployeeManager;