const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const { addController } = require('../controllers/worker');
const { workerValidator } = require('../validator');

const router = express.Router();

router.post('/', requestValidator(workerValidator), addController);

module.exports = router;
