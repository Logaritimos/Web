var alertasModal = require("../models/alertasModel");
var enderecoModel = require("../models/enderecoModel");



function GerarAlertas(req, res) {
   

    alertasModal.GerarAlertas( )
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}


function ListarAlertas(req, res) {
    
    const destino = req.query.destino
    const dataInicio = req.query.dataInicio
    const dataFim = req.query.dataFim

    alertasModal.ListarAlertas(destino, dataInicio, dataFim )
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}

module.exports = {
    GerarAlertas,
    ListarAlertas
}