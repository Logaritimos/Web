var database = require("../database/config");

function GerarAlertas(destino) {

    if (destino === undefined || destino == null) {
        console.log(destino + 'teste')

         const instrucaoLimpar = `
            DELETE FROM alertas 
            WHERE categoria = 'Informativo' 
            AND fkEmpresa = 1;
        `;

      return database.executar(instrucaoLimpar)
            .then(() => {
                const instrucaoSql = `SELECT * FROM voo`;
                return database.executar(instrucaoSql);
            })
            .then(resultados => {
                const promises = resultados.map(voo => {
                    const estado = voo.estado;
                    let resultadoBooleano = Math.random() < 0.5;
                    let tipoAlerta = ''
                    if (resultadoBooleano == true) {

                        tipoAlerta = 'Redução na demanda por voos para o'
                    } else {
                        tipoAlerta = 'Aumento na demanda por voos para o'
                    }
                    const instrucaoInserir = `
                        INSERT INTO alertas (descricao, categoria, fkEmpresa)
                        VALUES ('Alerta! ${tipoAlerta} estado de ${estado}', 'Informativo', 1);
                    `;
                    return database.executar(instrucaoInserir);
                });

                return Promise.all(promises);
            })
            .catch(erro => {
                console.error("Erro ao buscar ou inserir alertas:", erro);
            });
    }
}

function ListarAlertas(destino, dataInicio, dataFim) {

    destino = destino?.trim() || null;
    dataInicio = dataInicio?.trim() || null;
    dataFim = dataFim?.trim() || null;

   
    // SEM FILTROS
    if (! destino && !dataInicio && !dataFim) {
        const sql = `SELECT * FROM alertas ORDER BY dtHora DESC`;
        console.log('caiu 1');
        return database. executar(sql);
    }

    // Apenas DESTINO
    if (destino && !dataInicio && !dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
            ORDER BY dtHora DESC
        `;
        console.log('caiu 2 ');
        return database. executar(sql);
    }

    // Apenas DATA INICIO
    if (!destino && dataInicio && !dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE DATE(dtHora) >= '${dataInicio}'
            ORDER BY dtHora DESC
        `;
        console.log('caiu 3 ');
        return database.executar(sql);
    }

    // Apenas DATA FIM
    if (!destino && !dataInicio && dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE DATE(dtHora) <= '${dataFim}'
            ORDER BY dtHora DESC
        `;
        console.log('caiu 4 ');
        return database.executar(sql);
    }

    // DESTINO + DATA INICIO
    if (destino && dataInicio && !dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
            AND DATE(dtHora) >= '${dataInicio}'
            ORDER BY dtHora DESC
        `;
        console.log('caiu 5 ');
        return database. executar(sql);
    }

    // DESTINO + DATA FIM
    if (destino && !dataInicio && dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
            AND DATE(dtHora) <= '${dataFim}'
            ORDER BY dtHora DESC
        `;
        console.log('caiu 6');
        return database.executar(sql);
    }

    // DATA INICIO + DATA FIM (sem destino)
    if (!destino && dataInicio && dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE DATE(dtHora) BETWEEN '${dataInicio}' AND '${dataFim}'
            ORDER BY dtHora DESC
        `;
        console.log('caiu 7');
        return database.executar(sql);
    }

    // DESTINO + DATA INICIO + DATA FIM
    if (destino && dataInicio && dataFim) {
        const sql = `
            SELECT * FROM alertas
            WHERE (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
            AND DATE(dtHora) BETWEEN '${dataInicio}' AND '${dataFim}'
            ORDER BY dtHora DESC
        `;
        console.log('caiu 8 ');
        return database.executar(sql);
    }

}

module.exports = {
    GerarAlertas,
    ListarAlertas

};
