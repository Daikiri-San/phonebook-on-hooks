import { createSelector } from '@reduxjs/toolkit';

const getLoading = ({ contacts }) => contacts.loading;
const getContacts = ({ contacts }) => contacts.items;
const getFilter = ({ contacts }) => contacts.filter;
const getError = ({ contacts }) => contacts.error;

const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter(
      ({ name, phone }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        phone.includes(filter),
    );
  },
);

export default {
  getLoading,
  getContacts,
  getFilter,
  getError,
  getVisibleContacts,
};
