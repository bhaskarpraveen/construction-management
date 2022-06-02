-- sudo su - postgres
-- psql -U postgres
CREATE DATABASE construction_api;
-- created a database

-- create users table
CREATE TABLE users(
    ID SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(50),
    verified BOOLEAN DEFAULT FALSE NOT NULL,
    approved BOOLEAN DEFAULT FALSE NOT NULL,
    role_id INTEGER NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- create roles table
CREATE TABLE roles(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
-- creating a role
INSERT INTO roles(name) VALUES ('admin');
-- create default user
INSERT INTO users(first_name,last_name,phone_number,email,password,role_id) VALUES ('bhaskar','praveen','8464877285','praveennaidu264@gmail.com','helloworld',1);