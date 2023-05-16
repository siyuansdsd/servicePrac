function readAll(req, res) {
    if (tasks.length === 0) {
        res.json({ message: 'There are no tasks! Please add some.' });
    }
    res.json(tasks);
}

function readById(req, res) {
    const task = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Task not found!' });
        return;
    }
    res.json(task);
}

function create(req, res) {
    if (!req.body.description || !req.body.done || !req.body.id) {
        res.status(400).json({ error: 'Please provide all required fields!' });
        return;
    }
    if (req.body.done !== true && req.body.done !== false) {
        res.status(400).json({ error: 'Please provide a valid value for done!' });
        return;
    }
    if (tasks.find((task) => task.id === parseInt(req.body.id))) {
        res.status(400).json({ error: 'Task already exists!' });
        return;
    }
    if (typeof req.body.description !== 'string') {
        res.status(400).json({ error: 'Please provide a valid value for description!' });
        return;
    }
    const task = {
        id: req.body.id,
        description: req.body.description,
        done: req.body.done,
    };
    tasks.push(task);
    res.status(201).json({ message: 'Task created successfully!' });
}

function update(req, res) {
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

function DeleteById(req, res) {
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

function DeleteAll(req, res) {
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