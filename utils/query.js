const { pool } = require('./connection');

class SQLQueries {

    async getDepartments() {
        const query = `SELECT * FROM department;`;
        const response = await pool.query(query);
        const table = response.rows;
        return table;
    }

    async getRoles() {
        const query = 
            `SELECT role.id, role.title, role.salary, department_name 
                FROM role
                    INNER JOIN department
                    ON role.department_id = department.id
                ORDER BY role.title;`;
        const response = await pool.query(query);
        const table = response.rows;
        return table;
    }

    async getEmployees() {
        const query = 
            `SELECT employee.id, employee.first_name, employee.last_name, title, salary, department_name, concat(manager.first_name, ' ',manager.last_name) AS manager_name
                FROM employee
                JOIN role 
                    ON employee.role_id = role.id
                JOIN department
                    ON role.department_id = department.id
                LEFT OUTER JOIN employee AS manager
                    ON employee.manager_id = manager.id
                ;`;
        const response = await pool.query(query);
        const table = response.rows;
        return table;
    }

    async addDepartment(department) {
        const query = `INSERT INTO department 
        (department_name) VALUES ($1) RETURNING *`;
        const response = await pool.query(query, [department]);
        return response.rows;
    }

    async addRole(title, salary, department) {
        // get department id
        const dptQuery = `SELECT * from department WHERE department_name = $1`;
        const dptVals = [department];
        const dptRes = await pool.query(dptQuery, dptVals);
        const dptID = dptRes.rows[0].id;

        // add new role info to role table
        const roleQuery = `INSERT INTO role
        (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`;
        const values = [title, salary, dptID];
        const roleRes = await pool.query(roleQuery, values);

        return roleRes.rows;
    }

    async addEmployee(fname, lname, role, manager) {
        // get role id
        const roleQuery = `SELECT * from role WHERE title = $1`;
        const roleVals = [role];
        const roleRes = await pool.query(roleQuery, roleVals);
        const roleID = roleRes.rows[0].id;

        // get manager id
        let managerID;

        if (manager != 'None') {
            const managerQuery = `SELECT * from employee
                WHERE concat(first_name, ' ', last_name) = $1`;
            const managerVals = [manager];
            const managerRes = await pool.query(managerQuery, managerVals);
            managerID = managerRes.rows[0].id;
        } else {
            managerID = null;
        }
        

        // add new employee to employee table
        const employeeQuery = `INSERT INTO employee
            (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [fname, lname, roleID, managerID];
        console.log(values);
        const employeeRes = await pool.query(employeeQuery, values);

        return employeeRes.rows;
        // return values;
    }

    async updateRole(employee, role) {
        // get new role id
        const roleQuery = `SELECT * from role WHERE title = $1`;
        const roleVals = [role];
        const roleRes = await pool.query(roleQuery, roleVals);
        const roleId = roleRes.rows[0].id;

        // get employee id
        const employeeQuery = `SELECT * from employee
        WHERE concat(first_name, ' ', last_name) = $1`;
        const employeeVals = [employee];
        const employeeRes = await pool.query(employeeQuery, employeeVals);
        const employeeId = employeeRes.rows[0].id;

        // update role
        const query = `UPDATE employee SET role_id = $2 
        WHERE id = $1`;
        const values = [employeeId, roleId];
        pool.query(query, values);
    }

    async departmentChoices() {
        const dpts = await this.getDepartments();
        const choicesArr = [];
        
        // add the department names to the new array
        dpts.forEach(dpt => {
            choicesArr.push(dpt.department_name);
        });
        
        //return an array of the department names
        return choicesArr;
    }

    async roleChoices() {
        const roles = await this.getRoles();
        const roleArr = [];
        roles.forEach(role => {
            roleArr.push(role.title);
        })
        
        return roleArr;
    }

    async managerChoices() {
        const managers = await this.getEmployees();
        const managerArr = ['None'];
        managers.forEach(employee => {
            const fullName = `${employee.first_name} ${employee.last_name}`;
            managerArr.push(fullName);
        });

        return managerArr;
    }

    async employeeChoices() {
        const employees = await this.getEmployees();
        const employeeArr = [];

        employees.forEach(employee => {
            const fullName = `${employee.first_name} ${employee.last_name}`;
            employeeArr.push(fullName);
        });

        return employeeArr;
    }
}

module.exports = { SQLQueries };
