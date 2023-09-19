
exports.checkRole = (role) => {
  return (req, res, next) => {
    const user = req.user;
    console.log(user)
    if (user && user.role === role) {

      next();
    } else {

      res.status(403).json({
        message: "Not allowed to perform this action"
      });
    }
  };
}
