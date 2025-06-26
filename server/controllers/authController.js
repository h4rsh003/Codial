const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const streamifier = require('streamifier');
const cloudinary = require("../config/cloudinary");

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, skills, github, resume } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : "";

    const user = new User({
      name,
      email,
      password: hashed,
      skills,
      github,
      resume,
      avatar: avatarPath
    });
    await user.save();

    // Return data
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        github: user.github,
        resume: user.resume,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        github: user.github,
        resume: user.resume,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, skills, github, resume } = req.body;
    const updateFields = { name, skills, github, resume };

    // If an avatar image is uploaded
    if (req.file) {
      // Upload the file buffer to Cloudinary using upload_stream
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "avatars" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      updateFields.avatar = result.secure_url;
    }

    // Update user in DB
    const user = await User.findByIdAndUpdate(req.user, updateFields, { new: true });
    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = { signup, login, updateUser };
