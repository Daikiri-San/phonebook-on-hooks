import axios from 'axios';
import contactsActions from './contactsActions';

const fetchExistContacts = () => dispatch => {
  dispatch(contactsActions.fetchExistContactsRequest());

  axios
    .get('/userContacts')
    .then(({ data }) =>
      dispatch(contactsActions.fetchExistContactsSuccess(data)),
    )
    .catch(error => dispatch(contactsActions.fetchExistContactsError(error)));
};

const addContact = ({ name, phone }) => dispatch => {
  dispatch(contactsActions.addContactRequest());

  axios
    .post('/userContacts', { name, phone })
    .then(({ data }) => {
      setTimeout(() => {
        dispatch(contactsActions.addContactSuccess(data));
      }, 300);
    })
    .catch(error => dispatch(contactsActions.addContactError(error)));
};

const removeContact = id => dispatch => {
  dispatch(contactsActions.removeContactRequest());

  axios
    .delete(`/userContacts/${id}`)
    .then(() => dispatch(contactsActions.removeContactSuccess(id)))
    .catch(error =>
      dispatch(contactsActions.removeContactError(error.message)),
    );
};

const filterContacts = value => dispatch => {
  dispatch(contactsActions.changeFilter(value));
};

export default {
  addContact,
  fetchExistContacts,
  removeContact,
  filterContacts,
};
