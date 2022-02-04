import React from 'react';
import { connect } from 'react-redux';
import {
  thunkGetUser,
  thunkAddUserAddress,
  thunkUpdateUserAddress,
} from '../redux/reducer';

class App extends React.Component {
  render() {
    return <section>{JSON.stringify(this.props.user)}</section>;
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
