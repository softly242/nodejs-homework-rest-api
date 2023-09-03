const { RequestError, sendEmail } = require('../../helpers')
const User = require('../../models/user')
const { nanoid } = require('nanoid');



const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const { name, verificationToken } = user;

  sendEmail({ name, email, token: verificationToken });

  res.status(200).json({
    message: "Verification email sent",
  });
}

module.exports = resendVerifyEmail