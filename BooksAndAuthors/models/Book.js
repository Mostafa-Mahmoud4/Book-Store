const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }, // Reference to Author
    publishedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
