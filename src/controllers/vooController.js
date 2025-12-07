var vooModel = require("../models/vooModel");

function buscarDadosAnuais(req, res) {
    vooModel.buscarDadosAnuais()
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

function buscarDadosMensais(req, res) {
    vooModel.buscarDadosMensais()
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

function buscarDadosKPI1(req, res) {
    vooModel.buscarDadosKPI1()
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

function buscarDadosKPI2(req, res) {
    vooModel.buscarDadosKPI2()
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

function buscarDadosKPI3(req, res) {
    vooModel.buscarDadosKPI3()
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

function buscarDadosKPI4(req, res) {
    vooModel.buscarDadosKPI4()
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

function buscarDestinos(req, res) {
    vooModel.buscarDestinos()
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
function buscarPorFiltro(req, res) {
    var estado = req.body.estado;
    var ano = req.body.ano;
    var mes = req.body.mes;

    if (!estado || !ano || !mes) {
        return res.status(400).send("Filtros incompletos");
    }

    vooModel.buscarDadosVoo(estado, ano, mes)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                // Se não achar nada, retorna um objeto zerado para não quebrar o front
                res.status(200).json({
                    qtdAeroportos: 0,
                    numVoosTotais: 0,
                    numEmbarques: 0,
                    numDesembarques: 0,
                    numVoosRegulares: 0,
                    numVoosIrregulares: 0
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
module.exports = {
    buscarDadosAnuais,
    buscarDadosMensais,
    buscarDestinos,
    buscarPorFiltro,
    buscarDadosKPI1,
    buscarDadosKPI2,
    buscarDadosKPI3,
    buscarDadosKPI4

}