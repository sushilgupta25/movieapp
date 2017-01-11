var express = require('express');
var router = express.Router();
var config = require('../../config');
var commonUtil = require('../../services/commonUtil');
var movieController = require('./controller');
router.get('/', movieController.lists);

module.exports = router;