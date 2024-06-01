const { SQLQueries } = require('./query');


function promptUser() {
    const choiceQuery = new SQLQueries();

    const questions = [

        // SELECT ACTION
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            default: 'View All Employees',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
        // ADD DEPARTMENT
        {   // department name
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
            validate: function (input) {
                return input ? true : console.error('\n\u{26A0} Error: Must provide department name.');
            },
            when: (answers) => {
                return answers.action === 'Add Department';
            }
        },
        // ADD ROLE
        {   // role name
            type: 'input',
            name: 'newRole',
            message: 'What is the title of the role?',
            validate: function (input) {
                return input ? true : console.error('\n\u{26A0} Error: Must provide role title.');
            },
            when: (answers) => {
                return answers.action === 'Add Role';
            }
        },
        {   // role salary
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',
            validate: function (input) {
                return !isNaN(input) && input.length > 0 && input > 0 ? true : console.error('\n\u{26A0} Error: Must provide salary for role.');
            },
            when: (answers) => {
                return answers.action === 'Add Role';
            }
        },
        {   // role department
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does the role belong to?',
            choices: async function (answers) {
                const dptOptions = await choiceQuery.departmentChoices();
                return dptOptions;
            },
            when: (answers) => {
                return answers.action === 'Add Role';
            }
        // ADD EMPLOYEE
        },
        {   // fname
            type: 'input',
            name: 'fName',
            message: 'What is the employee\'s first name?',
            validate: function (input) {
                return input ? true : console.error('\n\u{26A0} Error: Must provide employee\'s first name.');
            },
            when: (answers) => {
                return answers.action === 'Add Employee';
            }
        },
        {   // lname
            type: 'input',
            name: 'lName',
            message: 'What is the employee\'s last name?',
            validate: function (input) {
                return input ? true : console.error('\n\u{26A0} Error: Must provide employee\'s last name.');
            },
            when: (answers) => {
                return answers.action === 'Add Employee';
            }
        },
        {   // employee role
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: async function (answers) {
                const roleOptions = await choiceQuery.roleChoices();
                return roleOptions;
            },
            when: (answers) => {
                return answers.action === 'Add Employee';
            }
        },
        {   // employee manager
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: async function (answers) {
                const managerOptions = await choiceQuery.managerChoices();
                return managerOptions;
            },
            when: (answers) => {
                return answers.action === 'Add Employee';
            }
        },
        //UPDATE EMPLOYEE ROLE
        {   
            type: 'list',
            name: 'updatedEmployee',
            message: 'Which employee would you like to update?',
            choices: async function (answers) {
                const employeeOptions = await choiceQuery.employeeChoices();
                return employeeOptions;
            },
            when: (answers) => {
                return answers.action === 'Update Employee Role';
            }
        },
        {   
            type: 'list',
            name: 'updatedRole',
            message: 'What is the employee\'s new role?',
            choices: async function (answers) {
                const roleOptions = await choiceQuery.roleChoices();
                return roleOptions;
            },
            when: (answers) => {
                return answers.action === 'Update Employee Role';
            }
        }
    ]
    return questions;
}

module.exports = { promptUser };