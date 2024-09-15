const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
    type: String,
    color: String,
    offsetX: Number,
    offsetX: Number,
    path: Array,
    height: Number,
    width: Number,
    center: Number
});

const drawingSchema = new mongoose.Schema({
    boardName: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
    elements: [elementSchema],
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;