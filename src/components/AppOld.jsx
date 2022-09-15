import shortid from 'shortid';
import React, { useState, useEffect } from 'react';
import SubmitForm from './SubmitForm/SubmitForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { css } from '@emotion/css';

export function App() {
  const setStartContacts = () => {
    if (JSON.parse(localStorage.getItem('contacts'))) {
      return JSON.parse(localStorage.getItem('contacts'));
    }
    return [];
  };
  const [contacts, setContacts] = useState(setStartContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFormResponse = data => {
    for (const contact of contacts) {
      if (contact.name === data.name) {
        alert('This name already exist!');
        return;
      }
    }
    setContacts(prevState => [
      ...prevState,
      { id: shortid.generate(), name: data.name, number: data.number },
    ]);
  };

  const onInputFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const onDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filtredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      className={css`
        padding: 20px;
      `}
    >
      <h1>Phonebook</h1>
      <SubmitForm onSend={onFormResponse} />
      <h2>Contacts</h2>
      <Filter filter={filter} onInputFilter={onInputFilter} />
      <Contacts contacts={filtredContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
}

export default App;
