const model = require('./model');
const prompts = require('./prompts');
let inquirer = require('inquirer');

const init = function () {
    console.log(`
     ________ ____    ____ _______ _____      ___   ____  ___ ________ ________     
    |_   __  |_   \\  /   _|_   __ \\_   _|   .'   \`.|_  _||_ _|_   __  |_   __  |    
      | |_ \_|  |   \\/   |   | |__) || |    /  .-.    \\ \\  //   | |_ \\_| | |_ \\_|    
      |  _| _  | |\\  /| |   |  ___/ | |   _| |   | |  \\ \\//    |  _| _  |  _| _     
     _| |__/ |_| |_\\/_| |_ _| |_   _| |__/ \\  \`-'  / _|  |_   _| |__/ |_| |__/ |    
    |________|_____||_____|_____| |________|\`.___.' |______| |________|________|    
                                                                                     
     ____    ____      _      ____  _____      _        ______  ________ _______     
    |_   \\  /   _|    / \\    |_   \\|_   _|    / \\     .' ___  ||_   __  |_   __ \\    
      |   \\/   |     / _ \\     |   \\ | |     / _ \\   / .'   \\_|  | |_ \_|  | |__) |   
      | |\\  /| |    / ___ \\    | |\\ \\| |    / ___ \\  | |   ____  |  _| _  |  __ /    
     _| |_\\/_| |_ _/ /   \\ \\_ _| |_\\   |_ _/ /   \\ \\_\\ \`.___]  |_| |__/ |_| |  \\ \\_  
    |_____||_____|____| |____|_____|\\____|____| |____|\`._____.'|________|____| |___|                         
    `);
    
    console.log (`Welcome to Employee Manager, please follow the prompts below`);

    let exit = false;
    do {
        let action = promptAction(prompts);
        switch (action) {
            case 'List all departments':
                // model.listAllDepartments
                break;
            case 'List all roles':
                // model.listAllRoles
                break;
            case 'List all employees':
                model.listAllEmployees();
                break;
            case 'Add a department':
                //model.addADepartment();
                break;
            case 'Add a role':
                // model.addARole();
                break;
            case 'Add an employee':
                // model.addAnEmployee();
                break;
            case 'Update department name':
                // model.updateDepartment();
                break;
            case 'Update role name and salary':
                // model.updateRole();
                break;
            case 'Update employee info':
                // model.updateEmployee();
                break;
            case 'Delete department':
                // model.deleteDepartment();
                break;
            case 'Delete role':
                // model.deleteRole();
                break;
            case 'Delete employee':
                // model.deleteEmployee();
                break;
            case 'Exit Employee Manager':
                exit = true;
        }
    } while (!exit);

    console.log(`\nGoodbye!\n`);

}

let promptAction = function(promptInfo) {
    inquirer.prompt(
        promptInfo
    ).then(answer => {
        return answer;
    }).catch(error => {
        if(error.isTtyError) {
            console.log('Prompt couldn\'t be rendered')
        } else {
            console.log(error);
        }
    });
}
module.exports = {
    init
}