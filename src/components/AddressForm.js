import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { thunkAddUserAddress } from '../redux/reducer';

const formFields = [
  { id: 0, type: 'text', name: 'street_number' },
  { id: 1, type: 'text', name: 'street_address' },
  { id: 2, type: 'text', name: 'city_name' },
  { id: 3, type: 'text', name: 'state_abbrev_name' },
  { id: 4, type: 'text', name: 'country_name' },
  { id: 5, type: 'text', name: 'zipcode' },
  { id: 6, type: 'text', name: 'domicile_type' },
  { id: 7, type: 'checkbox', name: 'is_primary' },
];

const Form = styled.form`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: auto;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  & > div.horiz {
    flex-direction: row;
    width: 100%;
  }
  & input[type='text'] {
    border: 1px solid lightgrey;
    padding: 4px;
    border-radius: 4px;
    margin: 4px 0;
  }
  & input[type='checkbox'] {
    margin-left: 10px;
  }
  & input[type='submit'] {
    padding: 4px;
    width: 156px;
  }
`;

const initForm = {
  street_number: '',
  street_address: '',
  city_name: '',
  state_abbrev_name: '',
  country_name: '',
  zipcode: '',
  domicile_type: '',
  is_primary: false,
};

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { ...initForm },
    };
    this.formatLabel = this.formatLabel.bind(this);
  }

  handleChange(e) {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.form);

    try {
      await this.props.addUserAddress(this.props.user.id, this.state.form);
      this.setState({ form: {} });
    } catch (err) {
      console.error(err);
    }
  }

  formatLabel(labelValue) {
    const label = labelValue.split('_').join(' ');
    return label[0].toUpperCase() + label.slice(1);
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        {formFields.map(({ id, type, name }) => (
          <div key={id} className={(type === 'checkbox' && 'horiz') || ''}>
            <label htmlFor={name}>{this.formatLabel(name)}</label>
            <input
              type={type}
              name={name}
              value={this.state.form[name]}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        ))}
        <input type="submit" value="Add Address" />
      </Form>
    );
  }
}

const mapState = (state) => ({
  user: state,
});

const mapDispatch = {
  addUserAddress: thunkAddUserAddress,
};

export default connect(mapState, mapDispatch)(AddressForm);
