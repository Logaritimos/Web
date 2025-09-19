var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrar-com-endereco", function (req, res) {
    empresaController.cadastrarComEndereco(req, res);
});
router.post("/login", function (req, res) {
    empresaController.login(req, res);
});

module.exports = router;