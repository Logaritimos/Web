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
function buscarDestinos() {
    
    // coloquei YEAR(CURRENT_DATE())-1 e YEAR(CURRENT_DATE())-2 pra pegar os dados do ano passado
    // e comparar com os dados dos ano retrasado.
    var instrucaoSql = `
        SELECT 
            estado as nome,
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-1 THEN numEmbarques ELSE 0 END) as embarqueAtual,
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-1 THEN numDesembarques ELSE 0 END) as desembarqueAtual,
            
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-2 THEN numEmbarques ELSE 0 END) as embarqueAnterior,
            SUM(CASE WHEN ano = YEAR(CURRENT_DATE())-2 THEN numDesembarques ELSE 0 END) as desembarqueAnterior
        FROM voo
        GROUP BY estado
        ORDER BY (SUM(CASE WHEN ano = 2024 THEN numEmbarques ELSE 0 END)) DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosAnuais,
    buscarDadosMensais,
    buscarDestinos
};