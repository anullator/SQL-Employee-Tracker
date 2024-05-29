// imports
const inquirer = require('inquirer');
const { pool } = require('./connection');
const { promptUser } = require('./prompt');
const { SQLQueries } = require('./query');

const init = async function() {
    pool.connect();

    let done = false;
    const query = new SQLQueries();
    // TODO: use while loop?
    while (!done) {    
        answers = await inquirer.prompt(promptUser());

        // prompts additional questions based on action
        // TODO: ADD QUERIES in switch
        // SYNTAX:
        // pool.query(<INSERT SQL STRING>, 
        // <INSERT ERROR HANDLING FUNCTION> 
        // )
        switch (answers.action) {
            case 'Add Department':
                console.log(`Added department`);
                break;
            case 'Add Role':
                console.log(`Added role`);
                break;
            case 'Add Employee':
                console.log(`Added employee`);
                break;
            case 'View All Departments':
                console.log(query.getDepartments())
            default:
                done = true;
                console.log(`Quit app.`);
        }
    }
}

module.exports = { init };