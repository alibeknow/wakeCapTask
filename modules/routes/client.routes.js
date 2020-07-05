const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const { addController } = require('../controllers/client');
const { clientValidator } = require('../validator');

const router = express.Router();

router.post('/', requestValidator(clientValidator), addController);

module.exports = router;
