// ADD FUNCTIONS TO QUERY DATABASE HERE 
// EXPORT AND CALL THEM IN SERVER.JS init() function
// CREATE A CLASS?
const pool = require('./connection');

class SQLQueries {

    runQuery(query) {
        return new Promise()
    }
    
    async getDepartments() {
        return `SELECT * FROM department;`
    }

    async getRoles() {
        const query = `SELECT * FROM role;`
        pool.query(query);

    }

    async getEmployees() {
        const query = `SELECT * FROM employee;`

    }

}

module.exports = { SQLQueries };