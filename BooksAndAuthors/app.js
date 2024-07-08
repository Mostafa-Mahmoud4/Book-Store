const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');



const app = express();
app.use(express.json());

connectDB();

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
 
