INSERT INTO department (department_name)
VALUES ('Marketing'),
       ('Finance'),
       ('Evaluation'),
       ('Legal'),
       ('Engineering'),
       ('Sales'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Social Media Manager', 60000, 001),
       ('Accountant', 75000, 002),
       ('Data Analyst', 70000, 003),
       ('Lawyer', 120000, 004),
       ('Senior Engineer', 95000, 005),
       ('Junior Engineer', 70000, 005),
       ('Salesperson', 80000, 006),
       ('Payroll Manager', 90000, 007);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carl', 'Smith', 001, null),
       ('Sandra', 'Reiner', 004, null),
       ('Angela', 'Downy', 005, null),
       ('John', 'Levanson', 006, 003);