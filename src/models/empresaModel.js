var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj, email, senha) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, email, senha)
        VALUES ('${razaoSocial}', '${cnpj}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorCnpjEmail(cnpj, email) {
    const instrucaoSql = `
        SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}' AND email = '${email}' LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}
function login(email, senha) {
    const instrucaoSql = `
        SELECT idEmpresa, razaoSocial, email
        FROM empresa
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    buscarEmpresaPorCnpjEmail,
    login
};