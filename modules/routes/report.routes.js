const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const { getController } = require('../controllers/report');
const { reportValidator } = require('../validator/index');

const router = express.Router();

router.get('/', requestValidator(reportValidator), getController);

module.exports = router;
