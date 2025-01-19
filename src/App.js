import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'
import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  </Router>
)

export default App
