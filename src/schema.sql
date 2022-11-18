CREATE DATABASE desafioNG;

DROP TABLE if exists users;

CREATE TABLE users (
	id serial primary key,
  	username varchar(100) NOT NULL UNIQUE,
	senha varchar(100) NOT NULL,
	accountId integer NOT NULL references Accounts(id)
);

DROP TABLE if exists accounts;

CREATE TABLE accounts (
	id serial primary key,
  	balance integer
);

DROP TABLE if exists transactions;

CREATE TABLE transactions (
	id serial primary key,
	debitedAccountId integer references accounts(id),
	creditedAccountId integer references accounts(id),
	valor integer NOT NULL,
	createdAt timestamptz NOT NULL
);
