import { createSelector } from '@reduxjs/toolkit';

const getLoading = ({ contacts }) => contacts.loading;
const getContacts = ({ contacts }) => contacts.items;
const getFilter = ({ contacts }) => contacts.filter;
const getError = ({ contacts }) => contacts.error;

const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    if (Array.isArray(contacts) && contacts.length > 0) {
      return contacts.filter(
        ({ name, number }) =>
          name.toLowerCase().includes(filter.toLowerCase()) ||
          number.includes(filter),
      );
    }
    return;
  },
);

export default {
  getLoading,
  getContacts,
  getFilter,
  getError,
  getVisibleContacts,
};
