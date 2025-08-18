CREATE DATABASE logaritmos;

USE logaritmos;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY auto_increment,
razaoSocial VARCHAR(200) NOT NULL,
cnpj CHAR(14) NOT NULL,
email VARCHAR(200) NOT NULL,
senha VARCHAR(200) NOT NULL
);

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY auto_increment,
logradouro VARCHAR(200) NOT NULL,
numero VARCHAR(15) NOT NULL,
complemento VARCHAR(100),
bairro VARCHAR(150) NOT NULL,
cidade VARCHAR(150) NOT NULL,
estado CHAR(2) NOT NULL,
cep CHAR(8) NOT NULL,
fkEmpresa INT NOT NULL UNIQUE,
FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
)auto_increment = 100;