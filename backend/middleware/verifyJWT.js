const jwt = require("jsonwebtoken");


const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorisation;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.sendStatus(401);
	}
	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.email = decoded.email;
		req.roles = decoded.role;
		next();
	});
};

module.exports = verifyJWT;
