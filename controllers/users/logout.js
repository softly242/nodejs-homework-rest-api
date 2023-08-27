const User = require('../../models/user');
const { RequestError } = require('../../helpers')

const logout = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) {
    throw RequestError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json("No Content");
}

module.exports = logout;