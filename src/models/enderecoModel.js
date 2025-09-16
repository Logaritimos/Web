var database = require("../database/config");

function cadastrarEndereco(logradouro, numero, complemento,bairro, cidade, estado, cep, fkEmpresa) {
    const instrucaoSql = `
        INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep, fkEmpresa)
        VALUES ('${logradouro}', '${numero}', '${complemento}', '${bairro}', '${cidade}', '${estado}','${cep}', ${fkEmpresa});
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarEndereco
};
