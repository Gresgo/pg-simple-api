const router = require('express').Router();

const main = process.cwd() + '/main/';
const log = require(main + 'log')(module);
const pg = require(main + 'db/pg');
const config = require(main + 'config');

const table = config.get('tableUisi');

router.get('/:login', (req, res) => {
    const login = req.params.login;
    pg
        .query(`SELECT password FROM ${table} WHERE uid = ${login}`)
        .then(result => {
            log.info(JSON.stringify(result.rows, null, '\t'));
            res.json(result.rows);
        })
        .catch(err => log.error(err.toString()));
});

module.exports = router;