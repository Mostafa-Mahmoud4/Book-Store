const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
});

module.exports = mongoose.model('Author', authorSchema);
