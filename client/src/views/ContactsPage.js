import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../redux/contacts';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactFormContainer';
import ContactList from '../components/ContactList/ContactListContainer';
import Filter from '../components/FilterContainer';

function ContactsPage() {
  const isLoadingContacts = useSelector(contactsSelectors.getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchExistContacts());
  }, [dispatch]);

  return (
    <>
      {isLoadingContacts && <Spinner />}
      <ContactForm />
      <Filter />
      <ContactList />
    </>
  );
}

export default ContactsPage;
