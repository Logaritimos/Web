var express = require("express");
var router = express.Router();

var relatoriosController = require("../controllers/relatoriosController");


router.get("/ListarRelatorios", function (req, res) {
    relatoriosController.ListarRelatorios(req, res);
});

router.delete("/DeletarRelatorios/:id", function (req, res) {

    relatoriosController.DeletarRelatorios(req, res);
});

router.patch("/FavoritarRelatorios/:id", function (req, res) {
    
    relatoriosController.FavoritarRelatorios(req, res);
});


router.post("/CriarRelatorio", function (req, res) {
    
    relatoriosController.CriarRelatorios(req, res);
});


router.get("/BuscarDadosVoo/:id", function (req, res) {
    relatoriosController.BuscarDadosVoo(req, res);
});


module.exports = router;