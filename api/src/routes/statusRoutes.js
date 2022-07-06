const statusController = require('../controllers/statusController');
const auth = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.get('/:uid', auth.verifyToken, statusController.getStatus);
router.post('/', auth.verifyToken, statusController.postStatus);

module.exports = router;