var database = require("../database/config");

function cadastrarUsuario(nome, telefone, email, senha, fkEmpresa, fkSetor, fkCargo) {
    const instrucaoSql = `
        INSERT INTO usuario (nome, telefone, email, senha, fkEmpresa, fkSetor, fkCargo)
        VALUES ('${nome}', '${telefone}', '${email}', '${senha}', '${fkEmpresa}', '${fkSetor}','${fkCargo}');
    `;
    return database.executar(instrucaoSql);
}

function atualizarEmail(idUsuario, novoEmail, emailAtual) {
    const instrucaoSql = `
        UPDATE usuario 
        SET email = '${novoEmail}' 
        WHERE idUsuario = ${idUsuario} AND email = '${emailAtual}';
    `;
    return database.executar(instrucaoSql);
}

function login(email, senha) {
    const instrucaoSql = `
        SELECT idUsuario, nome, email, fkEmpresa
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}
function atualizarSenha(idUsuario, novaSenha, senhaAtual) {
    const instrucaoSql = `
        UPDATE usuario 
        SET senha = '${novaSenha}' 
        WHERE idUsuario = ${idUsuario} AND senha = '${senhaAtual}';
    `;
    return database.executar(instrucaoSql);
}
function deletarUsuario(idUsuario, senha) {
    const instrucaoSql = `
        DELETE FROM usuario 
        WHERE idUsuario = ${idUsuario} AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarUsuario,
    atualizarEmail,
    login,
    atualizarSenha,
    deletarUsuario
};
