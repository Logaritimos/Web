var database = require("../database/config");

function listarPorEmpresa(idEmpresa) {
    var instrucao = `
        SELECT * FROM cardsComparativos WHERE fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, configA, configB, fkEmpresa) {
    // configA e configB serão strings JSON
    var instrucao = `
        INSERT INTO cardsComparativos (nome, favorito, sqlVooComparador, sqlVooComparado, fkEmpresa)
        VALUES ('${nome}', 0, '${configA}', '${configB}', ${fkEmpresa});
    `;
    return database.executar(instrucao);
}

function editar(idCard, nome, configA, configB) {
    var instrucao = `
        UPDATE cardsComparativos 
        SET nome = '${nome}', sqlVooComparador = '${configA}', sqlVooComparado = '${configB}'
        WHERE idCards = ${idCard};
    `;
    return database.executar(instrucao);
}

function deletar(idCard) {
    var instrucao = `DELETE FROM cardsComparativos WHERE idCards = ${idCard};`;
    return database.executar(instrucao);
}

function favoritar(idCard, status) {
    var instrucao = `UPDATE cardsComparativos SET favorito = ${status} WHERE idCards = ${idCard};`;
    return database.executar(instrucao);
}

module.exports = {
    listarPorEmpresa,
    cadastrar,
    editar,
    deletar,
    favoritar
};