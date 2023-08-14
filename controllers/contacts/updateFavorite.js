const Contact = require('../../models/contacts')
const { RequestError } = require('../../helpers')

const updateFavorite = async (req, res) => {
  const body = req.body;
  const { id } = req.params 
  const result = await Contact.findByIdAndUpdate(id, body, {new:true});
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json(result)
}

module.exports = updateFavorite