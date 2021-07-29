INSERT INTO department (name)
VALUES
('HR'),
('IT'),
('Sales'),
('Finance'),
('Legal'),
('Marketing');

INSERT INTO role (title, salary, department_id) 
VALUES
('HR Manager', '75000', 1),
('HR Admin', '50000', 1),
('IT Manager', '100000', 2),
('IT Admin', '65000', 2),
('Sales Manager', '70000', 3),
('Salesperson', '40000', 3),
('Finance Manager', '80000', 4),
('Accountant', '65000', 4),
('Chief Legal Offiver', '120000', 5),
('Lowyer', '80000', 5),
('Marketing Manager', '80000', 6),
('Marketing Admin', '50000', 6);
