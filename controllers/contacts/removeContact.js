const Contact = require('../../models/contacts')
const { RequestError } = require('../../helpers')

const removeContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params
  const result = await Contact.findByIdAndDelete({ _id: id, owner });
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json({
    message: 'Contact deleted',
  })
}

module.exports = removeContact