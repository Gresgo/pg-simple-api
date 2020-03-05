const winston = require('winston');

function logger(module) {
    let path = module.filename.split('\\').slice(-2).join('/');

    return new winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.splat(),
                    winston.format.label({ label: path }),
                    winston.format.colorize(),
                    winston.format.printf(nfo => {
                      return `${nfo.level}: [${nfo.label}] ${nfo.message}`;
                    })
                )
            })
            
        ]
    });

}

module.exports = logger;