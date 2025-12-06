var slackModel = require("../models/slackModel");

function selecionar(req, res) {
    var estado = req.body.estadoServer;
    var demanda = req.body.demandaServer;

    if (estado == undefined) {
        res.status(400).send("O estado está undefined!");
    } else if (demanda == undefined) {
        res.status(400).send("A demanda está undefined!");
    } else {
        slackModel.selecionar(estado, demanda)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao registrar a demanda no Slack! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    selecionar
}
