CREATE DATABASE logaritmos;

USE logaritmos;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY auto_increment,
razaoSocial VARCHAR(200) NOT NULL,
cnpj CHAR(14) NOT NULL
);

CREATE TABLE setor(
idSetor INT PRIMARY KEY auto_increment,
nome VARCHAR(45) NOT NULL
);

CREATE TABLE cargo(
idCargo INT PRIMARY KEY auto_increment,
titulo VARCHAR(45) NOT NULL
);

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY auto_increment,
nome VARCHAR(200) NOT NULL,
telefone VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
fkEmpresa INT NOT NULL,
fkSetor INT NOT NULL,
fkCargo INT NOT NULL,
CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkSetorUsuario FOREIGN KEY (fkSetor) REFERENCES setor(idSetor),
CONSTRAINT fkCargoUsuario FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo)
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
descricao VARCHAR(200) NOT NULL,
categoria VARCHAR(45) NOT NULL,
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkEmpresa INT NOT NULL,
CONSTRAINT fkEmpresaAlertas FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);


CREATE TABLE historicoRelatorios(
idRelatorio INT PRIMARY KEY auto_increment,
nome VARCHAR(100) NOT NULL,
favorito TINYINT(1) NOT NULL,
sqlRelatorio TEXT NOT NULL,
dtHoraCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
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
idCards INT PRIMARY KEY auto_increment,
nome VARCHAR(100) NOT NULL,
favorito TINYINT(1) NOT NULL,
sqlVooComparador TEXT NOT NULL,
sqlVooComparado TEXT NOT NULL,
fkEmpresa INT,
CONSTRAINT fkCardsEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE registroLogs(
idLogs INT PRIMARY KEY auto_increment,
categoria VARCHAR(15) NOT NULL,
descricao VARCHAR(200) NOT NULL,
dtHora DATETIME NOT NULL
);

CREATE TABLE notificacao(
idNotificacao INT PRIMARY KEY auto_increment,
mensagem VARCHAR(200) NOT NULL,
urlCanal VARCHAR(100) NOT NULL,
status VARCHAR(45) NOT NULL,
parametro VARCHAR(100) NOT NULL,
fkEmpresa INT NOT NULL,
CONSTRAINT fkEmpresaNotificacao FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO setor VALUES
(DEFAULT, 'Administração'),
(DEFAULT, 'Vendas'),
(DEFAULT, 'Marketing'),
(DEFAULT, 'Operações');

INSERT INTO cargo VALUES
(DEFAULT, 'Gerente de Projetos'),
(DEFAULT, 'Analista Financeiro'),
(DEFAULT, 'Consultor de Vendas'),
(DEFAULT, 'Assistente de Vendas'),
(DEFAULT, 'Gerente de Marketing'),
(DEFAULT, 'Coordenador de Marketing'),
(DEFAULT, 'Analista de Dados'),
(DEFAULT, 'Gerente de Produção');