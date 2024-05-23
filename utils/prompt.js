// TODO: NOTE: I may want to break the questions up into each category: department, role, and employee
function promptUser() {
    const questions = [

        // SELECT ACTION
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            default: 'View All Employees',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
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
                return !isNaN(input) ? true : console.error('\n\u{26A0} Error: Must provide salary for role.');
            },
            when: (answers) => {
                return answers.action === 'Add Role';
            }
        },
        {   // role department
            type: 'list',
            name: 'roleDepartment',
            message: 'What department does the role belong to?',
            choices: getDepartments(), // TODO: this function should return an array of the existing departments
            when: (answers) => {
                return answers.action === 'Add Role';
            }
        },

        // ADD EMPLOYEE
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
            choices: getRoles(), // TODO: this function should return an array of the existing roles
            when: (answers) => {
                return answers.action === 'Add Employee';
            }
        },
        {   // employee manager
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: function () {
                const managers = getManagers(); // TODO: this function should return an array of the existing roles
                managers.unshift('None');
                return managers;
            },
            when: (answers) => {
                return answers.action === 'Add Employee';
            }
        }
    ]

    return questions;
}

module.exports = promptUser;