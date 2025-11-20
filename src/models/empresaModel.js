var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj)
        VALUES ('${razaoSocial}', '${cnpj}');
    `;
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorCnpj(cnpj) {
    const instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}';`;
    return database.executar(instrucaoSql);
}
function buscarPorCnpj(cnpj) {
    var instrucaoSql = `
        SELECT * FROM empresa 
        JOIN endereco ON idEmpresa = fkEmpresa 
        WHERE cnpj = '${cnpj}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    buscarEmpresaPorCnpj,
    buscarPorCnpj
};