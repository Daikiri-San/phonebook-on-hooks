const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");
const { ObjectId } = Types;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  contacts: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
  token: String,
});

userSchema.statics.findUserById = findUserById;
userSchema.statics.createUser = createUser;
userSchema.statics.updateUserById = updateUserById;
userSchema.statics.deleteUserById = deleteUserById;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.findUserByToken = findUserByToken;

userSchema.statics.createContact = createContact;
userSchema.statics.deleteContactById = deleteContactById;
userSchema.statics.updateContactById = updateContactById;

async function findUserById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findById(id);
}

async function createUser(userParams) {
  return this.create(userParams);
}

async function updateUserById(id, userParams) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndUpdate(id, { $set: userParams }, { new: true });
}

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function findUserByToken(token) {
  return this.findOne({ token });
}

async function deleteUserById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndDelete(id);
}

async function createContact(id, contactParams) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return this.findByIdAndUpdate(
    id,
    { $push: { contacts: [contactParams] } },
    { new: true }
  );
}

async function deleteContactById(id, contactId) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndUpdate(
    id,
    { $pull: { contacts: { _id: contactId } } },
    { new: true }
  );
}

async function updateContactById(id, contactParams) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndUpdate(id, { $set: contactParams }, { new: true });
}

module.exports = {
  userModel: mongoose.model("User", userSchema),
};
