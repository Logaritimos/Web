var alertasModal = require("../models/alertasModel");
var enderecoModel = require("../models/enderecoModel");



function GerarAlertas(req, res) {
    const fkEmpresa = req.query.fkEmpresa;
        console.log("FK_EMPRESA RECEBIDA NO BACK:", fkEmpresa);

    alertasModal.GerarAlertas(fkEmpresa)
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}


function ListarAlertas(req, res) {
  const destino = req.query.destino;
  const dataInicio = req.query.dataInicio;
  const dataFim = req.query.dataFim;
  const fkEmpresa = req.query.fkEmpresa;

 
  alertasModal
    .ListarAlertas(destino, dataInicio, dataFim, fkEmpresa)
    .then((dados) => res.status(200).json({ mensagem: dados }))
    .catch((err) => {
      console.error("Erro em ListarAlertas controller:", err);
      res.status(500).json({ erro: err.message });
    });
}
module.exports = {
    GerarAlertas,
    ListarAlertas
}