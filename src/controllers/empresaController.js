var empresaModel = require("../models/empresaModel");
var enderecoModel = require("../models/enderecoModel");

function cadastrarComEndereco(req, res) {
    var { razaoSocialServer, emailServer, senhaServer, cnpjServer,
        logradouroServer, numeroServer, complementoServer, bairroServer,
        cidadeServer, estadoServer, cepServer } = req.body;


    if (!emailServer || !senhaServer || !razaoSocialServer || !cnpjServer || !logradouroServer ||
        !cepServer || !estadoServer || !cidadeServer || !bairroServer || !numeroServer) {
        res.status(400).send("Campos obrigatórios estão faltando.");
        return;
    }

    empresaModel.cadastrarEmpresa(razaoSocialServer, cnpjServer, emailServer, senhaServer)
        .then(() => {
            return empresaModel.buscarEmpresaPorCnpjEmail(cnpjServer, emailServer);
        })
        .then((resultadoBusca) => {
            if (resultadoBusca.length === 0) {
                res.status(404).json({ erro: "Empresa não encontrada após cadastro." });
                return;
            }

            const idEmpresa = resultadoBusca[0].idEmpresa;

            return enderecoModel.cadastrarEndereco( logradouroServer, numeroServer, complementoServer,
                bairroServer, cidadeServer, estadoServer, cepServer, idEmpresa);

        })
        .then(() => {
            res.status(201).json({ mensagem: "Empresa e endereço cadastrados com sucesso!" });
        })
        .catch((erro) => {
            console.log("Erro ao cadastrar empresa e endereço:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        empresaModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    autenticar,
    cadastrarComEndereco
}