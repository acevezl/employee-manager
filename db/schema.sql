CREATE DATABASE IF NOT EXISTS employee_manager;
USE employee_manager;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE IF NOT EXISTS departments (
	department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)
    );

CREATE TABLE IF NOT EXISTS roles (
	role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_title VARCHAR(30),
    role_salary DOUBLE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
    ON DELETE SET NULL
	);

CREATE TABLE IF NOT EXISTS employees (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
    );
    