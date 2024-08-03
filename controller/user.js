const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");


const signUp = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Please provide name"
            });
        }


        if (!email) {
            return res.status(400).json({
                message: "please provide email"
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "please provide password"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(500).json({
                status: false,
                message: 'User already exist'
            })
        }

        //generate salt
        const salt = await bcrypt.genSalt(10);

        //hashed password
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        user.salt = undefined;
        user.password = undefined;

        res.status(200).json({
            status: true,
            message: "User Created Successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            status: true,
            message: error.message
        })
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(404).json({
                message: "Please enter email"
            })
        }

        if (!password) {
            return res.status(404).json({
                message: "Please enter password"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '9h' });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            secure: process.env.NODE_ENV === 'development' ? true : false,
            maxAge: 10 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            status: true,
            message: "Login Successfully",
            token,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        user.password = undefined;

        res.status(200).json({
            status: true,
            message: "User profile fecthed",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const signOut = async (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({
            status: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { signUp, signIn, getUser, signOut }