import React from 'react';
import { connect } from 'react-redux';
import {
  thunkGetUser,
  thunkAddUserAddress,
  thunkUpdateUserAddress,
} from '../redux/reducer';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import { Container, TwoColumnLayout, Addresses } from '../style/layout/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.formatUsername = this.formatUsername.bind(this);
  }

  componentDidMount() {
    this.props.getUser(1);
  }

  setPrimaryAddress(userId, addressId) {
    this.props.updateUserAddress(userId, addressId, {
      is_primary: true,
    });
  }

  formatUsername(username) {
    return username[0].toUpperCase() + username.slice(1);
  }

  render() {
    const { user } = this.props;
    const { username, addresses } = user || {};

    if (!username || !addresses) return null;

    return (
      <Container>
        <h2>Welcome {this.formatUsername(username)}</h2>
        <TwoColumnLayout>
          <AddressForm />
          <Addresses>
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                setPrimaryAddress={() =>
                  this.setPrimaryAddress(user.id, address.id)
                }
              />
            ))}
          </Addresses>
        </TwoColumnLayout>
      </Container>
    );
  }
}

const mapState = (state) => ({
  user: state,
});

const mapDispatch = {
  getUser: thunkGetUser,
  addUserAddress: thunkAddUserAddress,
  updateUserAddress: thunkUpdateUserAddress,
};

export default connect(mapState, mapDispatch)(App);
