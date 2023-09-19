const { validateUser, User } = require("../../models/user/user.model");
const { sendPasswordMail } = require("../../utils/mailer");

function generatePassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#";
        let password = "";

        for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
        }

        return password;
}


exports.createUser = async (req, res) => {

        try {
                const {
                        fullName,
                        email,
                } = req.body;

                const user = await User.findOne({
                        email
                });
                if (user) return res.status(400).json({
                        success: false,
                        status: 400,
                        message: 'user exist'
                })
                const password = generatePassword(12)
                const newUser = new User({
                        fullName, email, password, role: "MODERATOR", status: "ACTIVE"
                });
                await sendPasswordMail(email, password)
                await newUser.save();
                return res.status(201).json({
                        success: true,
                        status: 201,
                        message: "user created successfully",
                        data: newUser
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error"
                });
        }
}


exports.getAllUsers = async (req, res) => {
        try {
                const users = await User.find({ role: "MODERATOR" }).populate("projects")
                return res.status(200).json({
                        success: true,
                        status: 200,
                        message: "Users retrieved successfully",
                        data: {
                                users,
                        },
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error",
                });
        }
};

exports.getUser = async (req, res) => {
        try {
                const user = await User.findById(req.params.id).populate("projects");
                if (!user) {
                        return res.status(404).json({
                                success: false,
                                status: 404,
                                message: "User not found",
                        });
                }

                res.status(200).json({
                        success: true,
                        status: 200,
                        data: {
                                user,
                        },
                });
        } catch (error) {
                console.log(error);
                res.status(500).json({
                        message: "Internal server error",
                });
        }
};

