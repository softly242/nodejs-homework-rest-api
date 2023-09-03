const { RequestError } = require('../../helpers')
const User = require('../../models/user')

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken)
  const user = await User.findOne({ verificationToken });

  console.log(user)

  if (!user) {
    throw  RequestError (404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyEmail