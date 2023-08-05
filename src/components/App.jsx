import { Component } from 'react';

import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount(){
    if(localStorage.getItem("contacts")){
      this.setState({
        contacts: JSON.parse(localStorage.getItem("contacts"))
      })
    }
  };
  componentDidUpdate(prevState){
    if(this.state.contacts!==prevState.contacts){
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  handleAddContact = contact => {
    const { contacts } = this.state;
    const { name } = contact;

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleFilter = e => {
    this.setState(() => ({
      filter: e.target.value,
    }));
  };

  filterContacts = () => {
    if (this.state.filter === '') {
      return this.state.contacts;
    } else {
      return this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    }
  };
  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter} />
        <ContactList
          contacts={this.filterContacts()}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
