const Contact = require('../../models/contacts')
const { RequestError } = require('../../helpers')

/* const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "name email");
  res.json(result);
}

 */
const listContacts = async (req, res) => {
 

const { _id: owner } = req.user;
const { page = 1, limit = 20, favorite, email, name } = req.query;
const skip = (page - 1) * limit;
const query = { owner };

if (favorite !== undefined) query.favorite = favorite;
if (email !== undefined) query.email = email;
if (name !== undefined) query.name = name;

const result = await Contact.find(query, "-createdAt -updatedAt", {
  skip,
  limit,
}).populate("owner", "email subscription");

/* if (!result) {
  throw RequestError(404);
} */

res.json(result);
};

module.exports = listContacts
