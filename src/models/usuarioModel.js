var database = require("../database/config");

function cadastrarUsuario(nome, telefone, email, senha, fkEmpresa, fkSetor, fkCargo) {
    const instrucaoSql = `
        INSERT INTO usuario (nome, telefone, email, senha, fkEmpresa, fkSetor, fkCargo)
        VALUES ('${nome}', '${telefone}', '${email}', '${senha}', '${fkEmpresa}', '${fkSetor}','${fkCargo}');
    `;
    return database.executar(instrucaoSql);
}

function atualizarEmail(idUsuario, novoEmail) {
    const instrucaoSql = `
        UPDATE usuario
        SET email = '${novoEmail}'
        WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function login(email, senha) {
    const instrucaoSql = `
        SELECT idUsuario, nome, email
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarUsuario,
    atualizarEmail,
    login
};
