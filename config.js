/**
 * Load production vs development settings
 * */

module.exports = function () {
    switch (process.env.NODE_ENV) {
        case 'dev': return {
            dburi: 'mongodb://localhost/test'
        };
        case 'prod': return {
            dburi: process.env.MONGOLAB_URI
        };
    }

};