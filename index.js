const express = require('express');
const logger = require('./v1/src/utils/logger');
const router = require('./v1/src/route/index');
const cors = require('./v1/src/middlewares/cor');

const tasks = [];

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger);
app.use('/', router);

app.listen(3000, () => {
    logger.info('message: Server started on port 3000');
});