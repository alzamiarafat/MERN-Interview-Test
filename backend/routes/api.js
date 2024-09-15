'use strict';
const express = require('express');
const router = express.Router();
const Drawing = require('../src/models/Drawing'); // Assuming the schema is in models/drawing.js
const DrawingController = require('../src/controllers/DrawingController');

router.get('/test', (req, res) => res.send('hello'));

router.post('/api/drawings', DrawingController.store);

router.get('/api/drawings', DrawingController.getAll);

router.get('/api/drawings/:id', async (req, res) => {
    try {
        const drawing = await Drawing.findById(req.params.id);
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json(drawing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/api/drawings/:id', async (req, res) => {
    console.error("🥳 ~ app.put ~ req:", req.body)
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
});

router.delete('/api/drawings/:id', async (req, res) => {
    try {
        const drawing = await Drawing.findByIdAndDelete(req.params.id);
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json({ message: 'Drawing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;