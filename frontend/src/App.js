import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/posts/:id" component={PostDetail} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
