var database = require("../database/config")

function cadastrarEmpresa(razaoSocial, cnpj) {
    const instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj)
        VALUES ('${razaoSocial}', '${cnpj}');
    `;
    return database.executar(instrucaoSql);
}

function buscarEmpresaPorCnpj(cnpj) {
    const instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}';`;
    return database.executar(instrucaoSql);
}
function buscarPorCnpj(cnpj) {
    var instrucaoSql = `
        SELECT * FROM empresa 
        JOIN endereco ON idEmpresa = fkEmpresa 
        WHERE cnpj = '${cnpj}';
    `;
    return database.executar(instrucaoSql);
}

// Função para buscar todos os dados (Empresa + Usuario + Endereco)
function buscarInfoCompleta(idUsuario) {
    var instrucao = `
        SELECT 
            u.nome as nomeUsuario, u.email, u.telefone, 
            c.idCargo, c.titulo as cargo, 
            s.idSetor, s.nome as setor,
            e.idEmpresa,  -- ADICIONE ISSO AQUI
            e.razaoSocial, e.cnpj,
            en.cep, en.estado as uf, en.cidade, en.bairro, en.logradouro, en.numero, en.complemento
        FROM usuario u
        JOIN empresa e ON u.fkEmpresa = e.idEmpresa
        JOIN cargo c ON u.fkCargo = c.idCargo
        JOIN setor s ON u.fkSetor = s.idSetor
        LEFT JOIN endereco en ON en.fkEmpresa = e.idEmpresa
        WHERE u.idUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function atualizarInfo(idUsuario, idEmpresa, dados) {
    var instrucaoEmpresa = `
        UPDATE empresa SET razaoSocial = '${dados.razaoSocial}', cnpj = '${dados.cnpj}' 
        WHERE idEmpresa = ${idEmpresa};
    `;
    
    var instrucaoUsuario = `
        UPDATE usuario SET 
            nome = '${dados.nome}', 
            telefone = '${dados.telefone}', 
            fkSetor = ${dados.setor}, 
            fkCargo = ${dados.cargo}
        WHERE idUsuario = ${idUsuario};
    `;

    var instrucaoEndereco = `
        UPDATE endereco SET 
            cep = '${dados.cep}', 
            estado = '${dados.uf}', 
            cidade = '${dados.cidade}',
            bairro = '${dados.bairro}', 
            logradouro = '${dados.logradouro}', 
            numero = '${dados.numero}', 
            complemento = '${dados.complemento}'
        WHERE fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoEmpresa)
        .then(() => database.executar(instrucaoUsuario))
        .then(() => database.executar(instrucaoEndereco));
}

module.exports = {
    cadastrarEmpresa,
    buscarEmpresaPorCnpj,
    buscarPorCnpj,
    buscarInfoCompleta,
    atualizarInfo
};