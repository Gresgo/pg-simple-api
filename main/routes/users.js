const router = require('express').Router();

const main = process.cwd() + '/main/';
const log = require(main + 'log')(module);
const pg = require(main + 'db/pg');
const config = require(main + 'config');

const table = config.get('tableUisi');

router.get('/', (req, res) => {
    pg
        .query(`SELECT * FROM ${table}`)
        .then(result => {
            log.info(JSON.stringify(result.rows, null, '\t'));
            res.json(result.rows);
        })
        .catch(err => log.error(err.toString()));
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pg
        .query(`SELECT * FROM ${table} WHERE uid = ${id}`)
        .then(result => {
            log.info(JSON.stringify(result.rows, null, '\t'));
            res.json(result.rows);
        })
        .catch(err => log.error(err));
});

module.exports = router;