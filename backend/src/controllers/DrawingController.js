'use strict';
const Drawing = require('../models/Drawing'); // Assuming the schema is in models/drawing.js
const CommonService = require('../services/CommonService');

const DrawingController = {
    getAll: async (req, res, next) => {
        try {
            const drawings = await Drawing.find();
            CommonService.successResponse(res, drawings)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res, next) => {
        try {
            const drawing = await Drawing.findById(req.params.id);
            if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
            res.json(drawing);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    store: async (req, res, next) => {
        try {
            const drawing = new Drawing(req.body);
            await drawing.save();
            res.status(201).json(drawing);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const updatedDrawing = await Drawing.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedDrawing) return res.status(404).json({ message: 'Drawing not found' });
            res.json(updatedDrawing);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req, res, next) => {
        try {
            const drawing = await Drawing.findByIdAndDelete(req.params.id);
            if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
            res.json({ message: 'Drawing deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

DrawingController.name = 'DrawingController';
module.exports = DrawingController;
