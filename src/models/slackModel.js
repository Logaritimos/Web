var database = require("../database/config");

function listar(idEmpresa) {
    // Busca tudo ordenado por Estado para ficar bonito na tela
    var instrucaoSql = `
        SELECT idSlackCanal, canal, paramEstado, paramDemanda, status 
        FROM slackCanal 
        WHERE fkEmpresa = ${idEmpresa}
        ORDER BY paramEstado, paramDemanda;
    `;
    return database.executar(instrucaoSql);
}

function atualizarStatus(idSlackCanal, novoStatus) {
    // Apenas liga ou desliga
    var instrucaoSql = `
        UPDATE slackCanal SET status = '${novoStatus}' WHERE idSlackCanal = ${idSlackCanal};
    `;
    return database.executar(instrucaoSql);
}

module.exports = { listar, atualizarStatus };