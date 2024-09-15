'use strict';
const CommonService = require('../services/CommonService');
const DrawingService = require('../services/DrawingService');

const DrawingController = {
    getAll: async (req, res, next) => {
        try {
            const drawings = await DrawingService.getAll();
            CommonService.successResponse(res, drawings)
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const drawing = await DrawingService.getById(req);
            if (!drawing) {
                const error = { statusCode: 404, message: 'Drawing not found' };
                CommonService.errorResponse(res, error)
            }
            CommonService.successResponse(res, drawing)
        } catch (error) {
            next(error)
        }
    },

    store: async (req, res, next) => {
        try {
            const drawing = await DrawingService.store(req);
            CommonService.successResponse(res, drawing);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const updatedDrawing = await DrawingService.update(req);
            if (!updatedDrawing) {
                const error = { statusCode: 404, message: 'Drawing not found' };
                CommonService.errorResponse(res, error);
            }
            CommonService.successResponse(res, updatedDrawing);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const drawing = await DrawingService.delete(req);
            if (!drawing) {
                const error = { statusCode: 404, message: 'Drawing not found' };
                CommonService.errorResponse(res, error);
            }
            CommonService.successResponse(res, drawing);
        } catch (error) {
            next(error)
        }
    }
};

DrawingController.name = 'DrawingController';
module.exports = DrawingController;
