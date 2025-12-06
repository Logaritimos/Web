var database = require("../database/config");
var database = require("../database/config");

async function GerarAlertas(fkEmpresa) {
  if (fkEmpresa == null || fkEmpresa === "" || fkEmpresa == 0) {
    console.log(
      fkEmpresa + " teste (fkEmpresa não informada), usando 1 como padrão"
    );
    fkEmpresa = 1;
  }

  const instrucaoLimpar = `
    DELETE FROM alertas 
    WHERE categoria = 'Informativo' 
      AND fkEmpresa = ${fkEmpresa};
  `;

  try {
    const resultadoLimpeza = await database.executar(instrucaoLimpar);

    if (resultadoLimpeza && resultadoLimpeza.affectedRows >= 0) {
      console.log(
        "Alertas informativos antigos limpos para fkEmpresa =",
        fkEmpresa
      );
    }

    const instrucaoSql = `SELECT * FROM voo`;
    const resultados = await database.executar(instrucaoSql);

    if (!resultados || resultados.length === 0) {
      console.log("Nenhum voo encontrado, nenhum alerta gerado.");
      return;
    }

    const values = resultados.map((voo) => {
      const estado = voo.estado;

      const resultadoBooleano = Math.random() < 0.5;
      const isReducao = resultadoBooleano == true;

      let tipoAlerta = "";

      if (isReducao == true) {
        tipoAlerta = "Redução na demanda por voos para o";
      } else {
        tipoAlerta = "Aumento na demanda por voos para o";
      }

      const descricao = `Alerta! ${tipoAlerta} estado de ${estado}`;

      return `('${descricao}', 'Informativo', ${fkEmpresa})`;
    });

    if (!values || values.length === 0) {
      console.log("Nenhum alerta para inserir.");
      return;
    }

    const instrucaoInserir = `
      INSERT INTO alertas (descricao, categoria, fkEmpresa)
      VALUES ${values.join(", ")};
    `;

    const resultadoInserir = await database.executar(instrucaoInserir);

    if (resultadoInserir && resultadoInserir.affectedRows > 0) {
      console.log(
        "Alertas gerados com sucesso:",
        resultadoInserir.affectedRows
      );
    } else {
      console.log("Nenhum alerta foi inserido.");
    }
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

 
  if (!fkEmpresa) {
    console.log(
      "fkEmpresa não informada em ListarAlertas → usuário não logado, retornando vazio"
    );
    const sql = `SELECT * FROM alertas WHERE 1 = 0`; 
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
