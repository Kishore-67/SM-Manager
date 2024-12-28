const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGODB_URI = "mongodb+srv://mithun_fsd:fullstack@cluster0.qtzvjzu.mongodb.net/produts?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Successfully connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Message Schema
const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ['sent', 'received'], required: true },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilePic: { type: String, default: 'https://via.placeholder.com/50' },
    lastMessage: { type: String },
    lastMessageTimestamp: { type: Date }
});

const User = mongoose.model('User', userSchema);

// Midnight Network Schema
const midnightPostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  userId: { type: String, required: true },
  userName: { type: String },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{
    content: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String },
    isAnonymous: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  }]
});

const MidnightPost = mongoose.model('MidnightPost', midnightPostSchema);

// Routes

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get messages between two users
app.get('/api/messages/:senderId/:receiverId', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.params.senderId, receiverId: req.params.receiverId },
                { senderId: req.params.receiverId, receiverId: req.params.senderId }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Send a message
app.post('/api/messages', async (req, res) => {
    const { senderId, receiverId, text, type } = req.body;
    
    try {
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            type
        });

        const savedMessage = await newMessage.save();

        // Update last message for both users
        await User.updateOne(
            { _id: senderId },
            { 
                lastMessage: text,
                lastMessageTimestamp: Date.now()
            }
        );

        await User.updateOne(
            { _id: receiverId },
            { 
                lastMessage: text,
                lastMessageTimestamp: Date.now()
            }
        );

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        profilePic: req.body.profilePic
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get posts by category
app.get('/api/midnight/:category', async (req, res) => {
  try {
    const posts = await MidnightPost.find({ 
      category: req.params.category 
    }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
app.post('/api/midnight/posts', async (req, res) => {
  const post = new MidnightPost({
    content: req.body.content,
    category: req.body.category,
    isAnonymous: req.body.isAnonymous,
    userId: req.body.userId,
    userName: req.body.isAnonymous ? 'Anonymous' : req.body.userName,
    timestamp: req.body.timestamp
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like a post
app.post('/api/midnight/posts/:postId/like', async (req, res) => {
  try {
    const post = await MidnightPost.findById(req.params.postId);
    post.likes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a comment to a post
app.post('/api/midnight/posts/:postId/comments', async (req, res) => {
  try {
    const post = await MidnightPost.findById(req.params.postId);
    post.comments.push({
      content: req.body.content,
      userId: req.body.userId,
      userName: req.body.isAnonymous ? 'Anonymous' : req.body.userName,
      isAnonymous: req.body.isAnonymous
    });
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
