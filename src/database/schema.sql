-- if you want to run this database on your machine, copy the entire queries below and run!

CREATE DATABASE calendar;

USE calendar;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(256) NOT NULL,
  password VARCHAR(512) NOT NULL,
  profile_image VARCHAR(512) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(256) NOT NULL,
  description VARCHAR(128),
  date VARCHAR(128) NOT NULL,
  user_id INT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

