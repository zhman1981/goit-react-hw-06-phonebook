import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from './redux/contactsSlice';
import { changeFilter } from './redux/filterSlice';
import SubmitForm from './SubmitForm/SubmitForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { css } from '@emotion/css';

export function App() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const onFormResponse = data => {
    for (const contact of contacts) {
      if (contact.name === data.name) {
        alert('This name already exist!');
        return;
      }
    }
    dispatch(
      addContact({
        id: shortid.generate(),
        name: data.name,
        number: data.number,
      })
    );
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const onInputFilter = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
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
