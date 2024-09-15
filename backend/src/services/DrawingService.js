'use strict';
const Drawing = require('../models/Drawing'); // Assuming the schema is in models/drawing.js

const DrawingService = {
    getAll: async () => {
        return await Drawing.find();
    },

    getById: async (req) => {
        const drawing = await Drawing.findById(req.params.id);
        return drawing;
    },

    store: async (req) => {
        const drawing = new Drawing(req.body);
        return await drawing.save();
    },

    update: async (req) => {
        const id = req.params.id
        return await Drawing.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
    },

    delete: async (req) => {
        const drawing = await Drawing.findByIdAndDelete(req.params.id);
        return drawing;
    },
};

DrawingService.name = 'DrawingService';
module.exports = DrawingService;
