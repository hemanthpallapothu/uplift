import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ECommerce from './components/ECommerce';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={ECommerce} />
    </Switch>
  </BrowserRouter>
);

export default App;