'use strict';
const apiRoute = require('./api');

module.exports = function (app) {
    app.use('/', apiRoute);
};
