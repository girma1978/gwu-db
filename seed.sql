DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'company_management') THEN
        EXECUTE 'CREATE DATABASE company_management';
    END IF;
END
$do$;

\c company_management

DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS department CASCADE;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL  
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,  
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL REFERENCES department(id)
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL REFERENCES role(id),
  manager_id INTEGER REFERENCES employee(id),
  CONSTRAINT unique_employee UNIQUE (first_name, last_name)  
);

INSERT INTO department (name) 
VALUES 
  ('Sales'), 
  ('Engineering'), 
  ('Human Resources')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role (title, salary, department_id) 
VALUES 
  ('Sales Manager', 60000, 1),
  ('Engineer', 80000, 2),
  ('HR Manager', 55000, 3)
ON CONFLICT (title) DO NOTHING;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1)
ON CONFLICT (first_name, last_name) DO NOTHING;
