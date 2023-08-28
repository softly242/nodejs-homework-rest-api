const Contact = require('../../models/contacts')
const { RequestError } = require('../../helpers')

const getContactById = async (req, res, next) => {
  const { _id: owner } = req.user;
   const { id } = req.params
  const result = await Contact.findById({ _id: id, owner });
  if (!result) {
    throw RequestError(404, 'Not Found')
  }
  res.json(result)
} 

module.exports = getContactById