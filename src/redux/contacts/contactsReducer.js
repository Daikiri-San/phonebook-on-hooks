import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import contactsActions from './contactsActions';

const fetchExist = (state, { payload }) => payload;
const addNewContact = (state, { payload }) => [...state, payload];
const removeContact = (state, { payload }) =>
  state.filter(({ id }) => id !== payload);

const items = createReducer([], {
  [contactsActions.fetchExistContactsSuccess]: fetchExist,
  [contactsActions.addContactSuccess]: addNewContact,
  [contactsActions.removeContactSuccess]: removeContact,
});

const filter = createReducer('', {
  [contactsActions.changeFilter]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [contactsActions.fetchExistContactsRequest]: () => true,
  [contactsActions.fetchExistContactsSuccess]: () => false,
  [contactsActions.fetchExistContactsError]: () => false,
  [contactsActions.addContactRequest]: () => true,
  [contactsActions.addContactSuccess]: () => false,
  [contactsActions.addContactError]: () => false,
  [contactsActions.removeContactRequest]: () => true,
  [contactsActions.removeContactSuccess]: () => false,
  [contactsActions.removeContactError]: () => false,
});

const error = createReducer(null, {
  [contactsActions.fetchExistContactsError]: (_, { payload }) =>
    payload.message,
  [contactsActions.addContactError]: (_, { payload }) => payload.message,
  [contactsActions.removeContactError]: (_, { payload }) => payload.message,
  [contactsActions.fetchExistContactsRequest]: () => null,
  [contactsActions.addContactRequest]: () => null,
  [contactsActions.removeContactRequest]: () => null,
});

const contactsReducer = combineReducers({
  items,
  filter,
  loading,
  error,
});

export default contactsReducer;
