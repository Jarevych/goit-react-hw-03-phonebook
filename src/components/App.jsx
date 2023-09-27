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
    const { name, number } = newContact;
    const contactExists = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().includes(name.toLowerCase()) ||
        contact.number === number
    );
    if (contactExists) {
      alert(`"${name}"is already in contacts`);
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

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: parcedContacts,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

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
