var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})
router.post("/login", function (req, res) {
    usuarioController.login(req, res);
});
router.put("/email", function (req, res) {
    usuarioController.atualizarEmail(req, res);
});
router.put("/senha", function (req, res) {
    usuarioController.atualizarSenha(req, res);
});

router.delete("/:idUsuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

module.exports = router;