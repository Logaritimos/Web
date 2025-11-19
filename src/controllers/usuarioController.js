//shhh
var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res) {
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var numero = req.body.numeroServer;
    var logradouro = req.body.logradouroServer;
    var complemento = req.body.complementoServer;
    var cep = req.body.cepServer;

    if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else {

        enderecoModel.cadastrarEndereco(logradouro, numero, complemento, bairro, cidade, estado, cep, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar,
}