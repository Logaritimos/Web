var slackModel = require("../models/slackModel");

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    slackModel.listar(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarStatus(req, res) {
    var idSlackCanal = req.params.idSlackCanal;
    var novoStatus = req.body.status; // Vem do JSON { "status": "Ativo" }

    slackModel.atualizarStatus(idSlackCanal, novoStatus)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { listar, atualizarStatus };