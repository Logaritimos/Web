var express = require("express");
var router = express.Router();

var vooController = require("../controllers/vooController");

router.get("/anuais", function (req, res) {
    vooController.buscarDadosAnuais(req, res);
});

router.get("/mensais", function (req, res) {
    vooController.buscarDadosMensais(req, res);
});

router.get("/destinos", function (req, res) {
    vooController.buscarDestinos(req, res);
});

router.post("/buscar", function (req, res) {
    vooController.buscarPorFiltro(req, res);
});
module.exports = router;