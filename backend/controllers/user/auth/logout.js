const User = require("../../models/User.model");

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken

	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(204); //No content


	const refreshToken = cookies.jwt;



	const foundUser = await User.findOne({ refreshToken }).exec();

	if (!foundUser) {
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(403); //Forbidden
	}

	//   delete refreshToken in db
	foundUser.refreshToken = "";
	const result = await foundUser.save();
	res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
	res.sendStatus(204);
};

module.exports = { handleLogout };
