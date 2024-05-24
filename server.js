const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');
const { promptUser } = require('./utils/prompt.js');

const PORT = process.env.PORT || 3003;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database connection
const pool = new Pool(
    {
        // PostgreSQL username
        user: 'postgres',
        // PostgreSQL password
        password: 'bootcamppass3',
        host: 'localhost',
        database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
)

pool.connect();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function init() {
    let done = false;
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
            default:
                done = true;
                console.log(`Quit app.`);
        }
    }
}

init();

