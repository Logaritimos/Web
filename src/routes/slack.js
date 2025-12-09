var express = require("express");
var router = express.Router();
var slackController = require("../controllers/slackController");

router.get("/listar/:idEmpresa", function (req, res) {
    slackController.listar(req, res);
});

router.put("/status/:idSlackCanal", function (req, res) {
    slackController.atualizarStatus(req, res);
});

module.exports = router;