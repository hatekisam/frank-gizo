const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models/user/user.model")
const handleLogin = async (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'User endpoint to login user'
	// #swagger.summary = 'Login user'
	const { email, password } = req.body;
	try {
		//check if user exists
		const user = await User.findOne({
			email,
		});
		if (!user)
			return res.status(400).json({
				success: false,
				status: 400,
				message: "Invalid email or password",
			});
		const isMatch = await user.comparePassword(password);
		if (!isMatch)
			return res.status(400).json({
				success: false,
				status: 400,
				message: "Invalid email or password",
			});

		const userData = {
			fullName: user.fullName,
			email: user.email,
			role: user.role
		};
		//generate token
		const token = await user.generateAuthToken();
		res.cookie("token", "Bearer " + token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		//send token to client
		res.status(200).json({
			success: true,
			status: 200,
			message: "login successful",
			data: user,
			token: token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};

module.exports = handleLogin;
