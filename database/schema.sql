\c postgres
DROP DATABASE IF EXISTS mastermind;
CREATE DATABASE mastermind;
\c mastermind;

DROP TABLE IF EXISTS scores CASCADE;
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  username TEXT,
  score INTEGER,
  difficulty TEXT
);
