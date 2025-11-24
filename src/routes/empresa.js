var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar-com-endereco", function (req, res) {
    empresaController.cadastrarComEndereco(req, res);
});
router.get("/buscar/:cnpj", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});
router.get("/info/:idUsuario", function (req, res) {
    empresaController.buscarInfo(req, res);
});

router.put("/info/:idUsuario", function (req, res) {
    empresaController.atualizarInfo(req, res);
});

module.exports = router;