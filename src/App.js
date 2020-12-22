import './App.css';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase';
import { setUser,clearUser } from './Store/Actions/authActions'
import { connect } from 'react-redux'
import { Spinner } from './Components/util/Spinner';

const Panel=React.lazy(()=>import('./Containers/Panel/index'))
const Register=React.lazy(()=>import('./Containers/Auth/RegisterContainer'))
const Signin =React.lazy(()=>import('./Containers/Auth/SigninContainer'))

class App extends Component {
  componentDidMount() {
    document.title="Slack"
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.userSet(user);
          this.props.history.push('/')
        } else {
          this.props.history.push('/signin')
          this.props.userClear();
        }
      })
  }
  render() {
    return this.props.isLoading?<Spinner/>: (
      <React.Suspense fallback={Spinner}>
        <Switch>
          <Route path='/' exact component={Panel} />
          <Route path='/signin' component={Signin} />
          <Route path='/register' component={Register} />
        </Switch>
      </React.Suspense>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.isloading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSet: (user) => dispatch(setUser(user)),
    userClear: () => dispatch(clearUser())
  }
}
const With = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const Router = () => (<BrowserRouter>
  <With />
</BrowserRouter>)


export default Router;
