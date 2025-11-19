var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj)
        VALUES ('${razaoSocial}', '${cnpj}');
    `;
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorCnpj(cnpj) {
    const instrucaoSql = `
        SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}' LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    buscarEmpresaPorCnpj,
};