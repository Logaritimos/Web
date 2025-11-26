var express = require("express");
var router = express.Router();
var cardController = require("../controllers/cardController");

router.get("/:idEmpresa", function(req, res) { cardController.listar(req, res); });
router.post("/cadastrar", function(req, res) { cardController.cadastrar(req, res); });
router.put("/editar/:idCard", function(req, res) { cardController.editar(req, res); });
router.delete("/:idCard", function(req, res) { cardController.deletar(req, res); });

module.exports = router;