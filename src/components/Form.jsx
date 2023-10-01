import React from 'react';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import NameInput from './NameInput';
import NumberInput from './NumberInput';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      "^[a-zA-Zа-яА-ЯІіЇїҐґ' -\u0400-\u04FF]+$",
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      '\\+?[0-9\\s\\-\\(\\)]+',
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

class FormInput extends React.Component {
  state = {
    name: '',
    number: '',
  };

  validateInput = async () => {
    const { name, number } = this.state;
    try {
      await schema.validate({ name, number }, { abortEarly: false });
      return true;
    } catch (errors) {
      console.log(errors);
      alert('Validation failed. Please check the form for errors.');
      return false;
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (await this.validateInput()) {
      const { name, number } = this.state;
      const newId = nanoid();
      const newContact = { id: newId, name, number };
      this.props.addContact(newContact);
      this.setState({ name: '', number: '' });
    }
  };
  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ number: e.target.value });
  };

  render() {
    return (
      <form className="form-container">
        <NameInput
          inputData={this.handleNameChange}
          userName={this.state.name}
        />
        <NumberInput
          inputData={this.handleNumberChange}
          number={this.state.number}
        />
        <div>
          <button type="submit" onClick={this.handleSubmit}>
            Додати
          </button>
        </div>
      </form>
    );
  }
}

export default FormInput;
