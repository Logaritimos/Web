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

CREATE TABLE alertas(
idAlerta INT PRIMARY KEY auto_increment,
descricao VARCHAR(200) NOT NULL
);

CREATE TABLE ocorrenciaAlertas(
idOcorrencia INT auto_increment,
fkEmpresa INT,
CONSTRAINT fkOcorrenciaEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
fkAlertas INT,
CONSTRAINT fkOcorrenciaAlertas FOREIGN KEY (fkAlertas) REFERENCES alertas(idAlerta),
CONSTRAINT pkCompostaOcorrencia PRIMARY KEY (idOcorrencia, fkEmpresa, fkAlertas),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE relatorio(
idRelatorio INT PRIMARY KEY auto_increment,
nome VARCHAR(100) NOT NULL,
favorito TINYINT(1) NOT NULL,
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkEmpresa INT NOT NULL,
CONSTRAINT fkRelatorioEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE voo(
idVoo INT PRIMARY KEY auto_increment,
estado VARCHAR(30) NOT NULL,
mes VARCHAR(30) NOT NULL,
ano INT NOT NULL,
qtdAeroportos INT NOT NULL,
numVoosRegulares INT NOT NULL,
numVoosIrregulares INT NOT NULL,
numEmbarques INT NOT NULL,
numDesembarques INT NOT NULL,
numVoosTotais INT NOT NULL
);

CREATE TABLE cardsComparativos(
idCards INT auto_increment,
fkVoo INT,
CONSTRAINT fkCardsVoo FOREIGN KEY (fkVoo) REFERENCES voo(idVoo),
fkEmpresa INT,
CONSTRAINT fkCardsEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT pkCompostaCards PRIMARY KEY (idCards, fkVoo, fkEmpresa),
nome VARCHAR(100) NOT NULL,
favorito TINYINT(1) NOT NULL
);

CREATE TABLE registroLogs(
idLogs INT PRIMARY KEY auto_increment,
categoria VARCHAR(15) NOT NULL,
descricao VARCHAR(200) NOT NULL,
dtHora DATETIME NOT NULL
);