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
  const [errors, setErrors] = useState({ name: '', number: '' });

  const handleSubmit = event => {
    event.preventDefault();

    const nameError = validateName(name);
    const numberError = validateNumber(number);

    if (nameError || numberError) {
      setErrors({ name: nameError, number: numberError });
      return;
    }

    onAddContact({ id: nanoid(), name, number });
    setName('');
    setNumber('');
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <FormField htmlFor="name">
        <FormFieldWrapper>
          <BsPersonFill size="18" />
          Name
        </FormFieldWrapper>

        <FieldStyled
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(['\- ]?[a-zA-Zа-яА-Я ])*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
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
          pattern="/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
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
