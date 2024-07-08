const Author = require('../models/Author');
const Book = require('../models/Book');

// Create a new author
exports.createAuthor = async (req, res, next) => {
    const newAuthor = new Author(req.body);
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
};

// Retrieve all authors
exports.getAllAuthors = async (req, res, next) => {
    const authors = await Author.find();
    res.status(200).json(authors);
};

// Retrieve an author by ID including their books
exports.getAuthorById = async (req, res, next) => {
    const author = await Author.findById(req.params.id).populate({
        path: 'books',
        select: 'title'
    });
    if (!author) throw { status: 404, message: "Author not found" };
    res.status(200).json(author);
};

// Update an author by ID
exports.updateAuthor = async (req, res, next) => {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) throw { status: 404, message: "Author not found" };
    res.status(200).json(updatedAuthor);
};

// Delete an author by ID
exports.deleteAuthor = async (req, res, next) => {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) throw { status: 404, message: "Author not found" };
    res.status(204).send();
};

// Retrieve authors with pagination
exports.getAuthorsPaginated = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const authors = await Author.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Author.countDocuments();

    res.status(200).json({
        authors,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10)
    });
};

// Search authors by name or bio and include their books
exports.searchAuthors = async (req, res, next) => {
    const { search } = req.query;
    const query = {
        $or: [
            { name: new RegExp(search, 'i') },
            { bio: new RegExp(search, 'i') }
        ]
    };

    const authors = await Author.find(query).populate({
        path: 'books',
        select: 'title'
    });
    res.status(200).json(authors);
};
