import React from 'react';
import { connect } from 'react-redux';
import {
  thunkGetUser,
  thunkAddUserAddress,
  thunkUpdateUserAddress,
} from '../redux/reducer';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import { Container } from '../style/layout/';
import styled from 'styled-components';

const TwoColumnLayout = styled.section`
  display: flex;
  width: 100%;
`;

const Addresses = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  & > div {
    margin: 4px;
  }
`;

class App extends React.Component {
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

    if (!username || !addresses) return null;

    return (
      <Container>
        <h2>Welcome {username[0].toUpperCase() + username.slice(1)}</h2>
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
