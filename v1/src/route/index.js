const express = require('express');
const taskRouter = require('./tasks');

const router = express.Router();
router.use('/tasks', taskRouter);

module.exports = router;