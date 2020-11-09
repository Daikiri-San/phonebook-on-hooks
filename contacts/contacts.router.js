const { Router } = require('express');
const { ContactsController } = require('./contacts.controller');
const { AuthController } = require('../auth/auth.controller');

const contactsRouter = Router();

contactsRouter.get(
  '/',
  AuthController.authorize,
  ContactsController.listContacts,
);
contactsRouter.post(
  '/',
  AuthController.authorize,
  ContactsController.validateAddContact,
  ContactsController.addContact,
);
contactsRouter.delete(
  '/:contactId',
  AuthController.authorize,
  ContactsController.removeContact,
);

contactsRouter.patch(
  '/:contactId',
  AuthController.authorize,
  ContactsController.updateContact,
);

module.exports = { contactsRouter };
