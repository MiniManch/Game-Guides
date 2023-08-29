require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const path = require('path');
const port = 5000;

const User = require('./Schemas/userModel');
const Comment = require('./Schemas/commentModel');
const Guide = require('./Schemas/guideModel');
const Lesson = require('./Schemas/lessonModel');

const userRoutes = require('./Routes/userRoutes');
const setupRoutes = require('./Routes/uploadRoutes');
const guideRoutes = require('./Routes/guideRoutes')
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@serverlessinstance0.zm2j4mm.mongodb.net/main?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// API routes
app.use('/user', userRoutes);
app.use('/database', setupRoutes);
app.use('/guides',guideRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });