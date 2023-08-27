import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactsForm } from './ContactsForm/ContactsForm';
import initialContacts from './contacts.json';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = localStorage.getItem('contacts');
      const contacts = savedContacts
        ? JSON.parse(savedContacts)
        : initialContacts;
      this.setState({ contacts });
    } catch (error) {
      console.error('Error reading contacts from localStorage:', error);
      this.setState({ contacts: initialContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      } catch (error) {
        console.error('Error saving contacts to localStorage:', error);
      }
    }
  }

  contactExists = newContact => {
    return this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    );
  };

  addContact = newContact => {
    if (this.contactExists(newContact)) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      const contactWithId = { ...newContact, id: Date.now() };
      this.setState(prevState => ({
        contacts: [contactWithId, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactsForm onAddContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
}
