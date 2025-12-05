var database = require("../database/config");
var database = require("../database/config");

async function GerarAlertas(fkEmpresa) {
  // Mantém uma validação simples igual você fazia
  if (fkEmpresa === undefined || fkEmpresa == null || fkEmpresa === "") {
    console.log(
      fkEmpresa + " teste (fkEmpresa não informada), usando 1 como padrão"
    );
    fkEmpresa = 1; // se quiser um padrão
  }

  const instrucaoLimpar = `
        DELETE FROM alertas 
        WHERE categoria = 'Informativo' 
        AND fkEmpresa = ${fkEmpresa};
    `;

  try {
        await database
            .executar(instrucaoLimpar);
        const instrucaoSql = `SELECT * FROM voo`;
        const resultados = await database.executar(instrucaoSql);
        const promises = resultados.map((voo) => {
            const estado = voo.estado;

            let resultadoBooleano = Math.random() < 0.5;
            let tipoAlerta = "";

            if (resultadoBooleano == true) {
                tipoAlerta = "Redução na demanda por voos para o";
            } else {
                tipoAlerta = "Aumento na demanda por voos para o";
            }

            const instrucaoInserir = `
                    INSERT INTO alertas (descricao, categoria, fkEmpresa)
                    VALUES ('Alerta! ${tipoAlerta} estado de ${estado}', 'Informativo', ${fkEmpresa});
                `;

            return database.executar(instrucaoInserir);
        });
        return await Promise.all(promises);
    } catch (erro) {
        console.error("Erro ao buscar ou inserir alertas:", erro);

        throw erro;
    }
}

function ListarAlertas(destino, dataInicio, dataFim, fkEmpresa) {
  destino = destino?.trim() || null;
  dataInicio = dataInicio?.trim() || null;
  dataFim = dataFim?.trim() || null;
  fkEmpresa = fkEmpresa?.trim() || null;

  console.log("ListarAlertas model:", {
    destino,
    dataInicio,
    dataFim,
    fkEmpresa,
  });

  // Se não tiver fkEmpresa, considera não logado → retorna vazio
  if (!fkEmpresa) {
    console.log(
      "fkEmpresa não informada em ListarAlertas → usuário não logado, retornando vazio"
    );
    const sql = `SELECT * FROM alertas WHERE 1 = 0`; // retorna 0 linhas
    return database.executar(sql);
  }

  // SEM FILTROS (só fkEmpresa)
  if (!destino && !dataInicio && !dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
            ORDER BY dtHora DESC
        `;
    console.log("caiu 1");
    return database.executar(sql);
  }

  // Apenas DESTINO
  if (destino && !dataInicio && !dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
            ORDER BY dtHora DESC
        `;
    console.log("caiu 2");
    return database.executar(sql);
  }

  // Apenas DATA INICIO
  if (!destino && dataInicio && !dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND DATE(dtHora) >= '${dataInicio}'
            ORDER BY dtHora DESC
        `;
    console.log("caiu 3");
    return database.executar(sql);
  }

  // Apenas DATA FIM
  if (!destino && !dataInicio && dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND DATE(dtHora) <= '${dataFim}'
            ORDER BY dtHora DESC
        `;
    console.log("caiu 4");
    return database.executar(sql);
  }

  // DESTINO + DATA INICIO
  if (destino && dataInicio && !dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
              AND DATE(dtHora) >= '${dataInicio}'
            ORDER BY dtHora DESC
        `;
    console.log("caiu 5");
    return database.executar(sql);
  }

  // DESTINO + DATA FIM
  if (destino && !dataInicio && dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
              AND DATE(dtHora) <= '${dataFim}'
            ORDER BY dtHora DESC
        `;
    console.log("caiu 6");
    return database.executar(sql);
  }

  // DATA INICIO + DATA FIM (sem destino)
  if (!destino && dataInicio && dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND DATE(dtHora) BETWEEN '${dataInicio}' AND '${dataFim}'
            ORDER BY dtHora DESC
        `;
    console.log("caiu 7");
    return database.executar(sql);
  }

  // DESTINO + DATA INICIO + DATA FIM
  if (destino && dataInicio && dataFim) {
    const sql = `
            SELECT * FROM alertas
            WHERE fkEmpresa = ${fkEmpresa}
              AND (descricao LIKE '%estado de ${destino}%' OR descricao LIKE '%estado do ${destino}%')
              AND DATE(dtHora) BETWEEN '${dataInicio}' AND '${dataFim}'
            ORDER BY dtHora DESC
        `;
    console.log("caiu 8");
    return database.executar(sql);
  }
}

module.exports = {
    GerarAlertas,
    ListarAlertas

};
