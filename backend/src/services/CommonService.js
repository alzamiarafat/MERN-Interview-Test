'use strict';

const CommonService = {
    successResponse: (res, data) => {
        return res.status(200).send({
            data
        });
    },

    errorResponse: (res, error) => {
        const message = error.message
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).send({
            error: message
        });
    }
};

CommonService.name = 'CommonService';
module.exports = CommonService;
