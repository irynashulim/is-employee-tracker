INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Iryna', 'Shulim', 1, null),
('John', 'Smith', 2, 1),
('Alex', 'North', 2, 1),
('Alexandru', 'Naumov', 3, null),
('Stephan', 'Virt', 4, 4),
('Josh', 'Arts', 4, 4),
('Olga', 'Gurita', 5, null),
('Jim', 'Volter', 6, 7),
('Oscar', 'Latty', 6, 7),
('Lia', 'Angelal', 7, null),
('Bob', 'Stats', 8, 10),
('Elsa', 'Hosk', 8, 10),
('Safiyya', 'Hasanova', 9, null),
('Arthur', 'West', 10, 13),
('Sam', 'Ornan', 10, 13),
('Victor', 'Lupascu', 11, null),
('Taylor', 'Kit', 12, 16),
('Terra', 'Nova', 12, 16);


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

INSERT INTO department (name)
VALUES
('HR'),
('IT'),
('Sales'),
('Finance'),
('Legal'),
('Marketing');