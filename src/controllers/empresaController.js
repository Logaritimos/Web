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

function login(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        res.status(400).send("Email e senha são obrigatórios.");
        return;
    }

    empresaModel.login(email, senha)
        .then((resultado) => {
            if (resultado.length === 1) {
                res.status(200).json({
                    idEmpresa: resultado[0].idEmpresa,
                    razaoSocial: resultado[0].razaoSocial,
                    email: resultado[0].email
                });
            } else {
                res.status(403).json({ erro: "Email ou senha inválidos!" });
            }
        })
        .catch((erro) => {
            console.log("Erro no login:", erro);
            res.status(500).json({ erro: erro.message });
        });
}
function atualizarEmail(req, res) {
    const { idEmpresa, novoEmail } = req.body;

    empresaModel.atualizarEmail(idEmpresa, novoEmail)
        .then(() => res.status(200).json({ mensagem: "Email atualizado com sucesso!" }))
        .catch(err => res.status(500).json({ erro: err.message }));
}

function atualizarSenha(req, res) {
    const { idEmpresa, novaSenha } = req.body;

    empresaModel.atualizarSenha(idEmpresa, novaSenha)
        .then(() => res.status(200).json({ mensagem: "Senha atualizada com sucesso!" }))
        .catch(err => res.status(500).json({ erro: err.message }));
}
module.exports = {
    cadastrarComEndereco,
    login,
    atualizarEmail,
    atualizarSenha
}