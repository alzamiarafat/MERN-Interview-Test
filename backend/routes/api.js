'use strict';
const express = require('express');
const router = express.Router();
const DrawingController = require('../src/controllers/DrawingController');

router.post('/api/drawings', DrawingController.store);
router.get('/api/drawings', DrawingController.getAll);
router.get('/api/drawings/:id', DrawingController.getById)
router.put('/api/drawings/:id', DrawingController.update);
router.delete('/api/drawings/:id', DrawingController.delete);

module.exports = router;