const model = require('./Model');
const prompts = require('./prompts');
const inquirer = require('inquirer');

// These are to wait for keypress
const readline = require('readline');

const init = function () {
    console.clear();
    console.log(`
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
    `);

    promptActions(prompts.employeePrompts);
}

promptActions = function(prompt) {
    inquirer.prompt(
        prompt
    ).then(answer => {
        switch (answer.action) {
            case 'List all departments':
                model.listAllDepartments();
                break;
            case 'List all roles':
                model.listAllRoles();
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
                process.exit();
        }
        waitForKeyPress();
        init();
    })
    .catch(error => {
        if(error.isTtyError) {
            console.log('Prompt couldn\'t be rendered')
        } else {
            console.log(error);
        }
    });
}

function waitForKeyPress() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        } 
    });
}

module.exports = {
    init
}