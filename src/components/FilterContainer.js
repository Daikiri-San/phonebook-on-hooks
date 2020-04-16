import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContextOfTheme } from '../contexts/ThemeContext';
import { contactsSelectors, contactsOperations } from '../redux/contacts';
import Filter from './Filter';

function FilterContainer() {
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();
  const onChangeFilter = value =>
    dispatch(contactsOperations.filterContacts(value));

  const theme = useContext(ContextOfTheme);
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    if (contacts.length <= 1) {
      return setAppear(false);
    }
    if (contacts.length > 1) {
      return setAppear(true);
    }
  }, [contacts]);

  return (
    <Filter onChangeFilter={onChangeFilter} theme={theme} appear={appear} />
  );
}

export default FilterContainer;
