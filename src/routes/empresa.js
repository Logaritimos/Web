var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar-com-endereco", function (req, res) {
    empresaController.cadastrarComEndereco(req, res);
});
router.get("/buscar/:cnpj", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

module.exports = router;