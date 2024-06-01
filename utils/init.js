// imports
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const { pool } = require('./connection');
const { promptUser } = require('./prompt');
const { SQLQueries } = require('./query');

const init = async function() {
    pool.connect();

    let done = false;
    const dbQuery = new SQLQueries();
    
    while (!done) {
        let answers = await inquirer.prompt(promptUser());
        
        // queries db based on selected action
        switch (answers.action) {
            case 'Add Department':
                const dpt = await dbQuery.addDepartment(answers.department);
                console.log(`Added ${dpt[0].department_name} department.`);
                break;
            case 'Add Role':
                const role = await dbQuery.addRole(answers.newRole, answers.roleSalary, answers.roleDepartment);
                console.log(`Added ${role[0].title} role.`);
                break;
            case 'Add Employee':
                const employee = await dbQuery.addEmployee(answers.fName, answers.lName, answers.role, answers.manager);
                console.log(`Added ${employee[0].first_name + ' ' + employee[0].last_name} as an employee`);
                break;
            case 'View All Departments':
                const departments =  await dbQuery.getDepartments();
                printTable(departments);
                break;
            case 'View All Roles':
                const roles =  await dbQuery.getRoles();
                printTable(roles);
                break;
            case 'View All Employees':
                const employees =  await dbQuery.getEmployees();
                printTable(employees);
                break;
            case 'Update Employee Role':
                const updated = await dbQuery.updateRole(answers.updatedEmployee, answers.updatedRole);
                console.log(`Updated ${answers.updatedEmployee}\'s role to ${answers.updatedRole}.`);
                break;
            default:
                done = true;
                console.log(`Quit app.`);
        }
    }
}

module.exports = { init };