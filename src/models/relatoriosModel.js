var database = require("../database/config");

function CriarRelatorios(ano, mes, nome) {
  console.log('Model.CriarRelatorios -> ano:', ano, 'mes:', mes, 'nome:', nome);

  const mesValido = mes !== null && mes !== undefined && mes !== '';

  let sqlRelatorio;

  if (mesValido) {
    sqlRelatorio = `SELECT * FROM voo WHERE ano = ${ano} AND mes = '${mes}'`;
  } else {
    sqlRelatorio = `SELECT * FROM voo WHERE ano = ${ano}`;
  }

  const sql = `
    INSERT INTO historicorelatorios (nome, sqlRelatorio, favorito, fkEmpresa)
    VALUES ('${nome}', '${sqlRelatorio}', 0, 1)
  `;

  console.log('é pra criar');
  console.log('SQL gerado:', sql);

  return database.executar(sql);
}




function FavoritarRelatorios(id, favorito) {
    console.log(id)

     const sql = `
          UPDATE historicorelatorios SET favorito = ${favorito} WHERE idRelatorio = ${id}
        `;
        console.log('è pra favoritar')
        return database.executar(sql);
}



function DeletarRelatorios(id) {
    console.log(id)

     const sql = `
           DELETE FROM historicorelatorios WHERE idRelatorio = ${id}
        `;
        console.log('era pra ter excluido')
        return database.executar(sql);
}

async function BuscarDadosVoo(idRelatorio) {
  const sqlHistorico = `
    SELECT sqlRelatorio
    FROM historicoRelatorios
    WHERE idRelatorio = ${idRelatorio}
  `;

  const linhas = await database.executar(sqlHistorico);
    if (!linhas || !linhas.length) {
        return []; 
    }
    const sqlRelatorio = linhas[0].sqlRelatorio; 
    console.log('Executando sqlRelatorio:', sqlRelatorio);
    return database.executar(sqlRelatorio);
}


function ListarRelatorios(destino, dataInicio, dataFim) {
  destino = destino?.trim() || null;
  dataInicio = dataInicio?.trim() || null;
  dataFim = dataFim?.trim() || null;

  if (dataFim == null || dataFim == 'dataFim') {
    console.log(dataFim);
    console.log('Deu ruim, resultado acima');
  } else {
    console.log('deu bommmm, tem coisas');
  }


  const orderBy = 'ORDER BY favorito DESC, dtHoraCriacao DESC';

  // 1) Sem nenhum filtro
  if (!destino && !dataInicio && !dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      ${orderBy}
    `;
    console.log('caiu 1');
    return database.executar(sql);
  }

  // 2) Apenas DESTINO
  if (destino && !dataInicio && !dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE destino = '${destino}'
      ${orderBy}
    `;
    console.log('caiu 2');
    return database.executar(sql);
  }

  // 3) Apenas DATA INICIO
  if (!destino && dataInicio && !dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE DATE(dtHoraCriacao) >= '${dataInicio}'
      ${orderBy}
    `;
    console.log('caiu 3');
    console.log('destino:', destino);
    console.log('dataInicio:', dataInicio);
    console.log('dataFim:', dataFim);
    return database.executar(sql);
  }

  // 4) Apenas DATA FIM
  if (!destino && !dataInicio && dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE DATE(dtHoraCriacao) <= '${dataFim}'
      ${orderBy}
    `;
    console.log('caiu 4');
    return database.executar(sql);
  }

  // 5) DESTINO + DATA INICIO
  if (destino && dataInicio && !dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE destino = '${destino}'
        AND DATE(dtHoraCriacao) >= '${dataInicio}'
      ${orderBy}
    `;
    console.log('caiu 5');
    return database.executar(sql);
  }

  // 6) DESTINO + DATA FIM
  if (destino && !dataInicio && dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE destino = '${destino}'
        AND DATE(dtHoraCriacao) <= '${dataFim}'
      ${orderBy}
    `;
    console.log('caiu 6');
    return database.executar(sql);
  }

  // 7) DATA INICIO + DATA FIM 
  if (!destino && dataInicio && dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE DATE(dtHoraCriacao) BETWEEN '${dataInicio}' AND '${dataFim}'
      ${orderBy}
    `;
    console.log('caiu 7');
    return database.executar(sql);
  }

  // 8) DESTINO + DATA INICIO + DATA FIM
  if (destino && dataInicio && dataFim) {
    const sql = `
      SELECT *
      FROM historicoRelatorios
      WHERE destino = '${destino}'
        AND DATE(dtHoraCriacao) BETWEEN '${dataInicio}' AND '${dataFim}'
      ${orderBy}
    `;
    console.log('caiu 8');
    return database.executar(sql);
  }
}

module.exports = {
    ListarRelatorios,
    DeletarRelatorios,
    FavoritarRelatorios,
    CriarRelatorios,
    BuscarDadosVoo

};
