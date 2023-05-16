const tasks = require('../model/db');

const readAll = (req, res) => {
    if (tasks.length === 0) {
        res.json({ message: 'There are no tasks! Please add some.' });
    }
    res.json(tasks);
}

const readById = (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Task not found!' });
        return;
    }
    res.json(task);
}

const create = (req, res) => {
    if (!req.query.description || !req.query.done || !req.params.id) {

        res.status(400).json({
            error: 'Please provide all required fields!',
            description: req.query.description,
            done: req.query.done,
            id: req.params.id
        });
        return;
    }
    if (req.query.done !== "true" && req.query.done !== "false") {
        res.status(400).json({ error: 'Please provide a valid value for done!' });
        return;
    }
    if (tasks.find((task) => task.id === parseInt(req.params.id))) {
        res.status(400).json({ error: 'Task already exists!' });
        return;
    }
    if (typeof req.query.description !== 'string') {
        res.status(400).json({ error: 'Please provide a valid value for description!' });
        return;
    }
    const task = {
        id: req.params.id,
        description: req.query.description,
        done: req.query.done,
    };
    tasks.push(task);
    res.status(201).json({ message: 'Task created successfully!' });
}

const update = (req, res) => {
    if (!req.body.description || !req.body.done) {
        res.status(400).json({ error: 'Please provide all required fields!' });
        return;
    }
    task = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Task not found!' });
        return;
    }
    tasks.pop(task);
    task.description = req.body.description;
    task.done = req.body.done;
    tasks.push(task);
    res.status(200).json({ message: 'Task updated successfully!' });

}

const DeleteById = (req, res) => {
    if (req.params.id === undefined) {
        res.status(400).json({ error: 'Please provide all required fields!' });
        return;
    }
    const task = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Task not found!' });
        return;
    }
    tasks.pop(task);
    res.status(200).json({ message: 'Task deleted successfully!' });
}

const DeleteAll = (req, res) => {
    while (tasks.length > 0) {
        tasks.pop();
    }
    res.status(200).json({ message: 'All tasks deleted successfully!' });
}

module.exports = {
    readAll,
    readById,
    create,
    update,
    DeleteById,
    DeleteAll,
};