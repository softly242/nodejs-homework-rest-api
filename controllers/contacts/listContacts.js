const Contact = require('../../models/contacts')


const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "name email");
  res.json(result);
}

module.exports = listContacts