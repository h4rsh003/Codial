const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
 

// SignUp Controller
const signup = async (req, res) => {
    try {
        const { name, email, password, skills, github, resume, avatar } = req.body;

        // if user already exist-
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already registerd" });

        //Hash the password-
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create newUser-
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            skills,
            github,
            resume,
            avatar
        });

        await newUser.save();

        res.status(201).json({ message: "SignUp Succesful" })
    } catch (error) {
        console.error("signUp error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check valid email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        // Match the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
        //Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login Successful",
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

    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

module.exports = { signup, login };