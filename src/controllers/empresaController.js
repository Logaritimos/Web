var empresaModel = require("../models/empresaModel");
var enderecoModel = require("../models/enderecoModel");
var usuarioModel = require("../models/usuarioModel");

function cadastrarComEndereco(req, res) {
    // Usuario e Empresa
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var nome = req.body.nomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Endereço
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var cep = req.body.cepServer;

    // Estrangeiras (Setor e Cargo)
    var setorTexto = req.body.setorServer;
    var cargoTexto = req.body.cargoServer;


    if (!razaoSocial || !cnpj || !nome || !email || !senha) {
        res.status(400).send("Dados incompletos.");
        return;
    }

    var fkSetor;
    if (setorTexto == "admin") fkSetor = 1;
    else if (setorTexto == "vendas") fkSetor = 2;
    else if (setorTexto == "marketing") fkSetor = 3;
    else if (setorTexto == "operacao") fkSetor = 4;
    else fkSetor = 1; // Default

    var fkCargo = Number(cargoTexto); 
    if (isNaN(fkCargo)) fkCargo = 1;

    empresaModel.buscarEmpresaPorCnpj(cnpj).then((resultado) => {
        
        if (resultado.length > 0) {
            // --- Empresa JÁ EXISTE ---
            var idEmpresa = resultado[0].idEmpresa;
            console.log(`Empresa ${idEmpresa}, [${razaoSocial}] já existe. Cadastrando apenas usuário...`);

            usuarioModel.cadastrarUsuario(nome, telefone, email, senha, idEmpresa, fkSetor, fkCargo)
                .then((resUsuario) => {
                     res.json({ mensagem: "Usuário cadastrado e vinculado a empresa existente!" });
                })
                .catch((erro) => {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });

        } else {
            // --- Empresa NÃO EXISTE (Cadastrar Tudo) ---
            console.log("Empresa nova. Cadastrando Empresa, Endereço e Usuário...");

            empresaModel.cadastrarEmpresa(razaoSocial, cnpj)
                .then((resEmpresa) => {
                    var idEmpresa = resEmpresa.insertId;

                    
                    var promessaEndereco = enderecoModel.cadastrarEndereco(logradouro, numero, complemento, bairro, cidade, estado, cep, idEmpresa);
                    var promessaUsuario = usuarioModel.cadastrarUsuario(nome, telefone, email, senha, idEmpresa, fkSetor, fkCargo);

                    return Promise.all([promessaEndereco, promessaUsuario]);
                })
                .then(() => {
                    res.status(201).json({ mensagem: "Empresa nova, endereço e usuário criados com sucesso!" });
                })
                .catch((erro) => {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
        }

    }).catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorCnpj(req, res) {
    var cnpj = req.params.cnpj;

    empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send();
        }
    }).catch((erro) => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    cadastrarComEndereco,
    buscarPorCnpj
}