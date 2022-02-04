import React from 'react';
import { connect } from 'react-redux';
import { thunkGetUser } from '../redux/reducer';

class App extends React.Component {
  componentDidMount() {
    this.props.getUser(1);
  }
  render() {
    return <section>{JSON.stringify(this.props.user)}</section>;
  }
}

const mapState = (state) => ({
  user: state,
});

const mapDispatch = {
  getUser: thunkGetUser,
};

export default connect(mapState, mapDispatch)(App);
