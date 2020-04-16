import { createAction } from '@reduxjs/toolkit';

const fetchExistContactsRequest = createAction('contacts/fetchExistRequest');
const fetchExistContactsSuccess = createAction('contacts/fetchExistSuccess');
const fetchExistContactsError = createAction('contacts/fetchExistError');

const addContactRequest = createAction('contacts/addRequest');
const addContactSuccess = createAction('contacts/addSuccess');
const addContactError = createAction('contacts/addError');

const removeContactRequest = createAction('contacts/removeRequest');
const removeContactSuccess = createAction('contacts/removeSuccess');
const removeContactError = createAction('contacts/removeError');

const changeFilter = createAction('filter/change');

export default {
  addContactRequest,
  addContactSuccess,
  addContactError,
  fetchExistContactsRequest,
  fetchExistContactsSuccess,
  fetchExistContactsError,
  removeContactRequest,
  removeContactSuccess,
  removeContactError,
  changeFilter,
};
