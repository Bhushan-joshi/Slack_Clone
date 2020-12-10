import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './Containers/Auth/RegisterContainer';
import Signin from './Containers/Auth/SigninContainer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={()=><h1>this is app.js</h1>} />
          <Route path='/signin'  component={Signin} />
          <Route path='/register'  component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
