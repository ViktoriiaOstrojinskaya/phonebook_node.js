import { nanoid } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  Form,
  FormInput,
  ButtonAddContact,
  FormLabel,
} from './ContactForm.styled';
import { selectAllContacts } from 'redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const contactList = useSelector(selectAllContacts);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name,
      phone: phone,
    };
    handleCheck(newContact);
    reset();
  };

  const handleCheck = newContact => {
    contactList.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? toast.error(`${name} is already in contacts`)
      : dispatch(addContact(newContact));
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </FormLabel>

      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </FormLabel>
      <ButtonAddContact type="submit">Add contact</ButtonAddContact>
    </Form>
  );
};
