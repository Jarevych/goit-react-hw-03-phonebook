import React from 'react';
import ContactList from './ContactList';
import FormInput from './Form';
import './styles.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = newContact => {
    const contactExists = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().includes(newContact.name.toLowerCase()) ||
        contact.number === newContact.number
    );
    if (contactExists) {
      alert(`"${newContact.name}"is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleFilter = e => {
    const filterValue = e.target.value;
    this.setState({ filter: filterValue });
  };

  deleteItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== itemId),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="app-container">
        <h2 className="app-title">Phonebook</h2>
        <FormInput
          inputData={this.handleInput}
          addContact={this.addContact}
          contacts={this.state.contacts}
        />
        <h2 className="contacts-title">Contacts</h2>
        <label>
          Filter
          <input
            type="search"
            name="filter"
            value={this.state.filter}
            onChange={this.handleFilter}
          />
        </label>
        <ContactList
          contacts={filteredContacts}
          onDeleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
