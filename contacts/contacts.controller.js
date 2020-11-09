const { userModel } = require("../auth/users.model");

class ContactsController {
  async listContacts(req, res, next) {
    try {
      const contacts = req.user.contacts;

      return res.status(200).json(contacts);
    } catch (err) {
      next(err);
    }
  }

  async addContact(req, res, next) {
    try {
      const newContact = await userModel.createContact(req.user.id, req.body);

      return res
        .status(201)
        .json(newContact.contacts[newContact.contacts.length - 1]);
    } catch (err) {
      next(err);
    }
  }

  validateAddContact(req, res, next) {
    const { name, phone } = req.body;
    if (!name) {
      return res.status(400).json({ message: "missing required name field" });
    }
    if (!phone) {
      return res.status(400).json({ message: "missing required phone field" });
    }
    next();
  }

  async removeContact(req, res, next) {
    const { contactId } = req.params;

    try {
      const searchedUser = req.user;
      if (!searchedUser) return res.status(404).json({ message: "Not found" });

      const newContacts = await userModel.deleteContactById(
        req.user.id,
        contactId
      );

      return res.status(200).json(newContacts.contacts);
    } catch (err) {
      next(err);
    }
  }

  async updateContact(req, res, next) {
    const { name, phone } = req.body;
    if (!name && !phone) {
      return res.status(400).json({
        message: "missing fields. You need any of name/phone to update contact",
      });
    }

    const { contactId } = req.params;

    try {
      const searchedUser = await userModel.findContactById(contactId);
      if (!searchedUser) return res.status(404).json({ message: "Not found" });
      const updatedContact = await userModel.updateContactById(
        contactId,
        req.body
      );

      return res.status(200).json(updatedContact);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ContactsController: new ContactsController(),
};
