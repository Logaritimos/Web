var usuarioModel = require("../models/usuarioModel");

function login(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    usuarioModel.login(email, senha)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(403).send("Email ou senha inválidos");
            }
        })
        .catch((erro) => res.status(500).json(erro));
}

function atualizarEmail(req, res) {
    const { idUsuario, novoEmail, emailAtual } = req.body;

    usuarioModel.atualizarEmail(idUsuario, novoEmail, emailAtual)
        .then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: "Email atualizado com sucesso!" });
            } else {
                res.status(401).json({ mensagem: "O email atual informado está incorreto." });
            }
        })
        .catch(err => res.status(500).json({ erro: err.message }));
}
function atualizarSenha(req, res) {
    const { idUsuario, novaSenha, senhaAtual } = req.body;

    usuarioModel.atualizarSenha(idUsuario, novaSenha, senhaAtual)
        .then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: "Senha atualizada com sucesso!" });
            } else {
                res.status(401).json({ mensagem: "A senha atual informada está incorreta." });
            }
        })
        .catch(err => res.status(500).json({ erro: err.message }));
}
function deletarUsuario(req, res) {
    const { idUsuario } = req.params;
    const { senha } = req.body;

    usuarioModel.deletarUsuario(idUsuario, senha)
        .then((resultado) => {
            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: "Usuário deletado!" });
            } else {
                res.status(401).json({ mensagem: "Senha incorreta. Não foi possível deletar." });
            }
        })
        .catch(err => res.status(500).json({ erro: err.message }));
}
module.exports = {
    atualizarSenha,
    atualizarEmail,
    deletarUsuario,
    login
}