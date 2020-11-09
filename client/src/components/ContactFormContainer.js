import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../redux/contacts';
import ContactForm from './ContactForm';

function ContactFormContainer() {
  const hasError = useSelector(contactsSelectors.getError);
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();
  const [apearNotice, setApearNotice] = useState(false);
  const [notice, setNotice] = useState(null);

  const addContact = (name, phone) => {
    const checkedForName = contacts.find(contact => name === contact.name);
    if (checkedForName) {
      setNotice(`${name} is already in contacts`);
      setApearNotice(true);
      setTimeout(() => setApearNotice(false), 2600);

      return;
    }

    const numberCheck = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
    const checkedNumber = numberCheck.test(phone);
    if (!checkedNumber) {
      setNotice('Hey! This is not a real phone number :)');
      setApearNotice(true);
      setTimeout(() => setApearNotice(false), 2600);

      return;
    }
    const newContact = {
      name,
      phone,
    };
    dispatch(contactsOperations.addContact(newContact));
  };

  return (
    <ContactForm
      hasError={hasError}
      addContact={addContact}
      apearNotice={apearNotice}
      notice={notice}
    />
  );
}

export default ContactFormContainer;
