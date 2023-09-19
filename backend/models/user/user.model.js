const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},

		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			min: 6,
			max: 100,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 100,
		},
		role: {
			type: String,
			enum: ["ADMIN", "STANDARD", "MODERATOR"],
			default:"ADMIN"
		},
		status: {
			type: String,
			enum: ["ACTIVE", "QUESTIONING", "FIRED"],
			default: "ACTIVE"
		},
		projects: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Project",
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

//generate jwt function
userSchema.methods.generateAuthToken = async function () {
	try {
		const token = jwt.sign(
			{
				_id: this._id,
				email: this.email,
				role: this.role
			},
			process.env.SECRET_KEY,
			{
				expiresIn: "1d",
			}
		);
		return token;
	} catch (error) {
		console.log(error);
	}
}
//compare password
userSchema.methods.comparePassword = async function (password) {
	try {
		const isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	} catch (error) {
		console.log(error);
	}
}

module.exports.User = mongoose.model("User", userSchema);