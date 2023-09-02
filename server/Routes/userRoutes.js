const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../Schemas/userModel');
const cloudinary = require('cloudinary').v2; // Import cloudinary library
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Import multer-storage-cloudinary
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: '/Game-Guides/User-Images', 
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const upload = multer({ storage: storage });

// Create user route
router.post('/create', upload.single('file'), async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      profileImage: req.file ? req.file.filename : '',
      confirmedEmail: false,
    });
    
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// // Get current user
router.get('/current-user', async (req, res) => {
  try {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      // Extract the token from the header
      const token = authHeader.split(' ')[1]; // Assuming the header value is in the format "Bearer <token>"
      // Verify the token and extract payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual JWT secret

      const userId = decoded.userId; // Assuming you stored the username in the token payload
      // Find the user by username
      const user = await User.findOne({ _id: userId });
      if (user) {
        // Return the user's profile
        return res.status(200).json(user);
      } else {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      // No authorization header
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Logout Route
router.post('/logout', async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'An error occurred while logging out' });
  }
});

// Get all users route
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Delete all users
router.delete('/deleteAll', async (req, res) => {
  try {
    // Delete all users from the database
    await User.deleteMany({});

    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ error: 'An error occurred while deleting users' });
  }
});

router.post('/update-image/:userId', upload.single('file'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file) {
      const uploadedFile = req.file;

      // Delete previous image from Cloudinary if it exists
      if (user.profileImage) {
        const publicId = user.profileImage.replace(/\.[^.]+$/, ''); // Get public ID
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(uploadedFile.path, {
        folder: '/Game-Guides/User-Images',
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
      });

      user.profileImage = result.public_id;
      await user.save();

      return res.status(200).json({ message: 'User image updated successfully' });
    } else {
      return res.status(400).json({ error: 'No image file provided' });
    }
  } catch (error) {
    console.error('Error updating user image:', error);
    res.status(500).json({ error: 'An error occurred while updating user image' });
  }
});

// Route to send confirmation email
router.post('/send-confirmation-email', requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve the username from the authenticated user

    const user = await User.findOne({_id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let username = user.username;
    // Generate a unique token
    const token = jwt.sign({ username }, process.env.EMAIL_CONFIRMATION_SECRET, {
      expiresIn: '10m',
    });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.username,
      subject: 'Confirm Your Email',
      text: `Click the link below to confirm your email: \n\n
     ${process.env.SERVER_BASE_URL}user/confirm-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ error: 'An error occurred while sending confirmation email' });
  }
});

// Route to confirm email
router.get('/confirm-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token missing' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.EMAIL_CONFIRMATION_SECRET);

    // Find the user by their username
    const user = await User.findOne({ username: decodedToken.username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's confirmedEmail field
    user.confirmedEmail = true;
    await user.save();

    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error('Error confirming email:', error);
    res.status(500).json({ error: 'An error occurred while confirming email' });
  }
});

module.exports = router;
