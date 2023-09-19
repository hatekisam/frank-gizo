const bcrypt = require("bcrypt");


const { validateUser, User } = require("../../../models/user/user.model");
const handleNewUser = async (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'User endpoint to register user'
	// #swagger.summary = 'Register user'
	try {
		const {
			fullName,
			email,
			password
		} = req.body;

		//check if user exists by checking email 
		const user = await User.findOne({
			email
		});
		if (user) return res.status(400).json({
			success: false,
			status: 400,
			message: 'user exist'
		})
		//create new user
		const newUser = new User({
			fullName, email, password
		});
		//save user
		await newUser.save();
		//generate token
		const token = await newUser.generateAuthToken();
		//new user data with no password
		const userData = {
			fullName: newUser.fullName,
			email: newUser.email,

		}
		return res.status(201).json({
			success: true,
			status: 201,
			message: "user created successfully",
			data: userData,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal server error"
		});
	}
}

module.exports = handleNewUser;
