import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  FormField,
  Form,
  FormFieldWrapper,
  FieldStyled,
  ErrorMessage,
  BtnForm,
} from './ContactsForm.styled';
import PropTypes from 'prop-types';
import {
  BsFillPersonPlusFill,
  BsPersonFill,
  BsFillTelephoneFill,
} from 'react-icons/bs';

const validateName = name => {
  const regex = /^[a-zA-Zа-яА-Я]+(['\- ]?[a-zA-Zа-яА-Я ])*$/;
  if (!regex.test(name.trim())) {
    return 'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan';
  }
  return '';
};

const validateNumber = number => {
  const regex =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  if (!regex.test(number.trim())) {
    return 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';
  }
  return '';
};

export const ContactsForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const nameErr = validateName(name);
    const numberErr = validateNumber(number);

    setNameError(nameErr);
    setNumberError(numberErr);

    if (nameErr || numberErr) return; // Stop form submission if there's an error

    onAddContact({ id: nanoid(), name, number });
    setName('');
    setNumber('');
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit} noValidate>
      <FormField htmlFor="name">
        <FormFieldWrapper>
          <BsPersonFill size="18" />
          Name
        </FormFieldWrapper>

        <FieldStyled
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
      </FormField>

      <FormField htmlFor="number">
        <FormFieldWrapper>
          <BsFillTelephoneFill size="14" />
          Number
        </FormFieldWrapper>

        <FieldStyled
          type="tel"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
        {numberError && <ErrorMessage>{numberError}</ErrorMessage>}
      </FormField>

      <BtnForm type="submit">
        <BsFillPersonPlusFill size="16" />
        Add contact
      </BtnForm>
    </Form>
  );
};

ContactsForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
