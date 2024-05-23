const express = require(express);
const { Pool } = require(pg);
const inquirer = require(inquirer);
const { selectAction, addDepartment, addRole, addEmployee, updateRole } = require('./utils/prompt');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database connection
const pool = new Pool(
    {
        // PostgreSQL username
        user: postgres,
        // PostgreSQL password
        password: bootcamppass3,
        host: localhost,
        database: employee_db,
    },
    console.log(`Connected to the employee_db database.`)
)

// TODO: ADD QUERIES
// SYNTAX:
// pool.query(<INSERT SQL STRING>, 
// <INSERT ERROR HANDLING FUNCTION> 
// )

pool.connect();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function init() {

    let answers;
    // TODO: use while loop?
    const action = await inquirer.prompt(selectAction());

    // prompts additional questions based on action
    switch (action) {
        case 'Add Department':
            answers = await addDepartment();
            break;
        case 'Add Role':
            answers = await addRole();
            break;
        case 'Add Employee':
            answers = await addEmployee();
            break;
    }
}

init();

