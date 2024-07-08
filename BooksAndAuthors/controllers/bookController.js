const Book = require('../models/Book');
const Author = require('../models/Author');

// Create a new book
exports.createBook = async (req, res, next) => {
    const { title, content, author: authorId } = req.body;

    // Ensure the author exists
    const author = await Author.findById(authorId);
    if (!author) throw { status: 404, message: "Author not found" };

    const newBook = new Book({ title, content, author: authorId });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
};

// Retrieve all books
exports.getAllBooks = async (req, res, next) => {
    const books = await Book.find().populate('author', 'name'); // Populate author's name
    res.status(200).json(books);
};

// Retrieve a book by ID
exports.getBookById = async (req, res, next) => {
    const book = await Book.findById(req.params.id).populate('author', 'name');
    if (!book) throw { status: 404, message: "Book not found" };
    res.status(200).json(book);
};

// Update a book by ID
exports.updateBook = async (req, res, next) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author', 'name');
    if (!updatedBook) throw { status: 404, message: "Book not found" };
    res.status(200).json(updatedBook);
};

// Delete a book by ID
exports.deleteBook = async (req, res, next) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) throw { status: 404, message: "Book not found" };
    res.status(204).send();
};

// Retrieve books with pagination
exports.getBooksPaginated = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
        .populate('author', 'name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Book.countDocuments();

    res.status(200).json({
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10)
    });
};

// Search books by title or author
exports.searchBooks = async (req, res, next) => {
    const { search } = req.query;
    const query = { title: new RegExp(search, 'i') }
     
    

    const books = await Book.find(query).populate('author', 'name');
    res.status(200).json(books);
};
