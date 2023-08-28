const User = require('../../models/user');


const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });

  res.json({ _id, subscription });
};

module.exports = updateSubscriptionUser