CREATE DATABASE calendar;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  profile_image VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  description VARCHAR,
  date VARCHAR NOT NULL,
  user_id UUID,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
