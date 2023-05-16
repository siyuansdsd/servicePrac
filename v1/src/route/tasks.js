const {
    readAll,
    readById,
    create,
    update,
    DeleteById,
    DeleteAll,
} = require('../controllers/tasks');
const express = require('express');

const taskRouter = express.Router();

taskRouter.get('/', readAll);
taskRouter.get('/:id', readById);
taskRouter.post('/:id', create);
taskRouter.put('/:id', update);
taskRouter.delete('/:id', DeleteById);
taskRouter.delete('/', DeleteAll);

module.exports = taskRouter;