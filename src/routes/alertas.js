var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/GerarAlertas", function (req, res) {
    alertasController.GerarAlertas(req, res);
});

router.get("/ListarAlertas", function (req, res) {
    alertasController.ListarAlertas(req, res);
});

module.exports = router;