DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL -- hold department name
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL, -- hold role title
    salary DECIMAL NOT NULL, -- hold role salary
    department_id INTEGER NOT NULL -- hold reference to department role belongs to
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, -- to hold employee first name
    last_name VARCHAR(30) NOT NULL, -- to hold employee last name
    role_id INTEGER NOT NULL, -- to hold reference to employee role
    manager_id INTEGER -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
);



