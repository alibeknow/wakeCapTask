const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const { addController } = require('../controllers/site');
const { siteValidator } = require('../validator');

const router = express.Router();

router.post('/', requestValidator(siteValidator), addController);

module.exports = router;
