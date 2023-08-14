const { Schema, model } = require('mongoose')

const {handleMongooseError} = require('../helpers')

const shema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }

)
shema.post("save", handleMongooseError);

const Contact = model('contact', shema)

module.exports = Contact


/* const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')
const { controllerWrapper } = require('../helpers')

const contactsPath = path.join(__dirname, 'contacts.json')

const updateContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.find((item) => item.id === id)
  return result || null
}

const removeContact = async (id) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === id)
  if (index === -1) return null
  const [result] = contacts.splice(index, 1)
  await updateContacts(contacts)
  return result
}

const addContact = async ({name,email,phone}) => {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const updateContact = async (id, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === id)
  if (index === -1) {
    return null
  }
 contacts[index] = { ...contacts[index], ...body}
  await updateContacts(contacts)
  return contacts[index]
}

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
 */