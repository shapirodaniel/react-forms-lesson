import React from 'react';
import { connect } from 'react-redux';
import {
  thunkGetUser,
  thunkAddUserAddress,
  thunkUpdateUserAddress,
} from '../redux/reducer';
import AddressCard from './AddressCard';
import { Container } from '../style/layout/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  componentDidMount() {
    this.props.getUser(1);
  }

  setPrimaryAddress(userId, addressId) {
    this.props.updateUserAddress(userId, addressId, {
      is_primary: true,
    });
  }

  render() {
    const { user } = this.props;
    const { username, addresses } = user || {};

    if (!addresses) return null;

    return (
      <Container>
        <h1>Welcome {username}</h1>
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            setPrimaryAddress={() =>
              this.setPrimaryAddress(user.id, address.id)
            }
          />
        ))}
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
