const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const User = require('../models/User');
const { updateUser } = require('../controllers/authController');
const upload = require('../middleware/upload');

router.get("/profile", authMiddleware, async (req, res)=>{
    try {
        const user = await User.findById(req.user).select("-password");

        if(!user) {
            res.status(404).json({message:"User not found"})
        }
        res.json({ user });
    } catch (error){
        console.error("Profile error:", error);
        res.status(500).json({message:'Server error'})
    }
});

router.put("/update", authMiddleware, upload.single("avatar"), updateUser);
module.exports = router