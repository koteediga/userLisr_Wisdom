import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import UserDetails from './UserDetails'
import NotFound from './NotFound'
import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/:id" component={UserDetails} />
      <Route path="*" component={<NotFound />} />
    </Switch>
  </Router>
)

export default App
