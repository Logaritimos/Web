var relatoriosModal = require("../models/relatoriosModel");
const { param } = require("../routes/relatorios");


function CriarRelatorios(req, res) {
   

 const { ano, mes, nome } = req.body;

 console.log('Ano recebido:', ano);
  console.log('Mes recebido:', mes);
  console.log('Nome recebido:', nome);

    relatoriosModal.CriarRelatorios(ano, mes, nome )
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}

function BuscarDadosVoo(req, res) {
    
  const id = req.params.id
     console.log(req.params.id)
     console.log(' id esta aqui' + id)

    relatoriosModal.BuscarDadosVoo(id)
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}


function ListarRelatorios(req, res) {
    
    const destino = req.query.destino
    const dataInicio = req.query.dataInicio
    const dataFim = req.query.dataFim

    relatoriosModal.ListarRelatorios(destino, dataInicio, dataFim )
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}

function DeletarRelatorios(req, res) {
    

    const id = req.params.id
  console.log('Id para deltar:', id);

    relatoriosModal.DeletarRelatorios(id)
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}

function FavoritarRelatorios(req, res) {
    

    const id = req.params.id

      const { favorito } = req.body; 
console.log('Id:', id, 'novo favorito:', favorito);


    relatoriosModal.FavoritarRelatorios(id, favorito )
        .then((dados) => res.status(200).json({ mensagem: dados }))
        .catch(err => res.status(500).json({ erro: err.message }));
}

module.exports = {
    ListarRelatorios,
    DeletarRelatorios,
    FavoritarRelatorios,
    CriarRelatorios,
    BuscarDadosVoo
}