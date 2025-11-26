var cardModel = require("../models/cardModel");

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;
    cardModel.listarPorEmpresa(idEmpresa)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var fkEmpresa = req.body.fkEmpresa;
    
    // Recebemos objetos JSON do front e convertemos para string para salvar no banco
    var configA = JSON.stringify(req.body.configA);
    var configB = JSON.stringify(req.body.configB);

    if(!nome || !fkEmpresa) return res.status(400).send("Dados incompletos");

    cardModel.cadastrar(nome, configA, configB, fkEmpresa)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function editar(req, res) {
    var idCard = req.params.idCard;
    var nome = req.body.nome;
    var configA = JSON.stringify(req.body.configA);
    var configB = JSON.stringify(req.body.configB);

    cardModel.editar(idCard, nome, configA, configB)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function deletar(req, res) {
    var idCard = req.params.idCard;
    cardModel.deletar(idCard)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = { listar, cadastrar, editar, deletar };