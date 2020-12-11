import './App.css';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Register from './Containers/Auth/RegisterContainer';
import Signin from './Containers/Auth/SigninContainer';
import { Component } from 'react';
import firebase from './firebase';
import { setUser } from './Store/Actions/authActions'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.userSet(user);
          this.props.history.push('/')
        } else {
          this.props.history.push('/signin')
        }
      })
  }
  render() {
    return (
      <>
        <Switch>
          <Route path='/' exact render={() => <h1>this is app.js</h1>} />
          <Route path='/signin' component={Signin} />
          <Route path='/register' component={Register} />
        </Switch>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSet: (user) => dispatch(setUser(user))
  }
}
const With = withRouter(connect(null, mapDispatchToProps)(App));

const Router = () => (<BrowserRouter>
  <With />
</BrowserRouter>)


export default Router;
