var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar-com-endereco", function (req, res) {
    empresaController.cadastrarComEndereco(req, res);
});
router.post("/login", function (req, res) {
    empresaController.login(req, res);
});
router.put("/email", function (req, res) {
    empresaController.atualizarEmail(req, res);
});

router.put("/senha", function (req, res) {
    empresaController.atualizarSenha(req, res);
});
module.exports = router;