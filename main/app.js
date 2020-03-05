const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const log = require('./log')(module);

const api = require('./routes/api');
const users = require('./routes/users');
const login = require('./routes/login');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', api);
app.use('/users', users);
app.use('/login', login);

app.use((req, res, next) => {
    res.status(404);
    log.debug("error %d: %s", res.statusCode, req.url)
    res.json({
        error: "Not found"
    });
    return;
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    log.debug("error %d: %s", res.statusCode, req.url)
    res.json({
        error: err.message
    });
    return;
});

module.exports = app;