var database = require("../database/config");

function buscarDadosAnuais() {
    // Soma embarques e desembarques por ano
    var instrucaoSql = `
        SELECT ano, SUM(numEmbarques + numDesembarques) as total 
        FROM voo 
        GROUP BY ano 
        ORDER BY ano;
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosMensais() {
    // Soma por mês (pegando geral, ideal seria fazer o filtro pelo ano atual)
    // O ORDER BY FIELD faz com que os meses não fiquem em ordem alfabética :)
    var instrucaoSql = `
        SELECT mes, SUM(numEmbarques + numDesembarques) as total 
        FROM voo 
        GROUP BY mes
        ORDER BY FIELD(mes, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosKPI1() {
    // Soma por ano o número de voos totais
    var instrucaoSql = `
        SELECT ano, SUM(numVoosTotais) AS totalVoos FROM voo WHERE ano IN (2019, 2021) GROUP BY ano;
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosKPI2() {
    // Soma por ano o número de embarques
    var instrucaoSql = `
        SELECT ano, SUM(numEmbarques) AS totalEmbarques FROM voo WHERE ano IN (2019, 2021) GROUP BY ano;
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosKPI3() {
    // Realiza o cálculo direto no select e devolve o nome do estado
    var instrucaoSql = `
        SELECT estado, POWER(SUM(CASE WHEN ano = 2021 THEN numVoosTotais END) / SUM(CASE WHEN ano = 2019 THEN numVoosTotais END)
        , 1.0/3) - 1 AS taxaPorEstado FROM voo WHERE ano IN (2019, 2021) GROUP BY estado ORDER BY taxaPorEstado LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosKPI4() {
    // Realiza o cálculo direto no select e devolve o nome do estado
    var instrucaoSql = `
        SELECT estado, POWER(SUM(CASE WHEN ano = 2021 THEN numVoosTotais END) / SUM(CASE WHEN ano = 2019 THEN numVoosTotais END)
        , 1.0/3) - 1 AS taxaPorEstado FROM voo WHERE ano IN (2019, 2021) GROUP BY estado ORDER BY taxaPorEstado DESC LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function buscarDestinos() {

    // coloquei YEAR(CURRENT_DATE())-1 e YEAR(CURRENT_DATE())-2 pra pegar os dados do ano passado
    // e comparar com os dados dos ano retrasado.
    var instrucaoSql = `
        SELECT 
            estado as nome,
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-3 THEN numEmbarques ELSE 0 END) as embarqueAtual,
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-3 THEN numDesembarques ELSE 0 END) as desembarqueAtual,
            
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-4 THEN numEmbarques ELSE 0 END) as embarqueAnterior,
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-4 THEN numDesembarques ELSE 0 END) as desembarqueAnterior
        FROM voo
        GROUP BY estado
        ORDER BY (SUM(CASE WHEN ano = 2021 THEN numEmbarques ELSE 0 END)) DESC;
    `;
    return database.executar(instrucaoSql);
}

function buscarDadosVoo(estado, ano, mes) {
    var instrucao = `
        SELECT * FROM voo 
        WHERE estado = '${estado}' 
        AND ano = ${ano} 
        AND mes = '${mes}';
    `;
    return database.executar(instrucao);
}
module.exports = {
    buscarDadosAnuais,
    buscarDadosMensais,
    buscarDestinos,
    buscarDadosVoo,
    buscarDadosKPI1,
    buscarDadosKPI2,
    buscarDadosKPI3,
    buscarDadosKPI4
};