const {Pool} = require('pg');
const main = process.cwd() + '/main/';
const log = require(main + 'log')(module);
const config = require(main + 'config');

const pool = new Pool(config.get('pgUisi'));

pool.on('connect', () => {
    log.info('connect')
})

pool.on('remove', () => {
    log.info('disconnect')
})

module.exports = pool;