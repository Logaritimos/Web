var express = require("express");
var router = express.Router();

var slackController = require("../controllers/slackController");

router.post("/selecionar", function (req, res) {
    slackController.selecionar(req, res);
});

module.exports = router;
