var database = require("../database/config");

function selecionar(estado, demanda) {
    var instrucaoSql = `
        INSERT INTO slackCanal (paramEstado, paramDemanda)
        VALUES ('${estado}', '${demanda}');
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    selecionar
};
