INSERT INTO department (department_name)
VALUES ('Marketing'),
       ('Finance'),
       ('Evaluation'),
       ('Legal'),
       ('Engineering'),
       ('Sales'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Social Media Manager', 60000, 1),
       ('Accountant', 75000, 2),
       ('Data Analyst', 70000, 3),
       ('Lawyer', 120000, 4),
       ('Senior Engineer', 95000, 5),
       ('Junior Engineer', 70000, 5),
       ('Salesperson', 80000, 6),
       ('Payroll Manager', 90000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carl', 'Smith', 1, null),
       ('Sandra', 'Reiner', 4, null),
       ('Angela', 'Downy', 5, null),
       ('John', 'Levanson', 6, 3);