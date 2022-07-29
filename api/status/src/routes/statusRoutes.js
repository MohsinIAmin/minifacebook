const statusController = require('../controllers/statusController');

const express = require('express');
const router = express.Router();

router.get('/', statusController.getStatus);
router.post('/', statusController.postStatus);

module.exports = router;