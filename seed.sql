INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("HR"), ("Legal");

-- 1
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", "60000", 1);

-- 2
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", "80000", 2); 

-- 3
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", "90000", 1); 

-- 4
INSERT INTO role (title, salary, department_id)
VALUES ("Engineering Manager", "110000", 2); 

-- 5
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", "80000", 3); 

-- 6
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Manager", "130000", 4); 

-- 7
INSERT INTO role (title, salary, department_id)
VALUES ("HR Rep", "50000", 3); 

-- 8
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", "100000", 4); 

-- Sales
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Morton", "Laughridge", 1, "Michiko Classen");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Phyllis", "Lawing", 1, "Michiko Classen");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Julio", "Goad", 1, "Michiko Classen");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Carmelina", "Ketron", 1, "Michiko Classen");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Michiko", "Classen", 3, null);

-- Engineering
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Mariko", "Gehling", 2, "Celinda Piland");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Magdalene", "Alspaugh", 2, "Celinda Piland");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Boris", "Maughan", 2, "Celinda Piland");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Myles", "Brecht", 2, "Celinda Piland");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Celinda", "Piland", 4, null);

-- HR
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Eleanora", "Castro", 7, "Chante Raya");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Winifred", "Eberhardt", 7, "Chante Raya");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Chante", "Raya", 5, null);

-- Legal
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Stevie", "Keister", 8, "Josefina Poe");

INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Josefina", "Poe", 4, null);