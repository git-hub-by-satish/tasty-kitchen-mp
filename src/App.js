import {Route} from 'react-router-dom'
import Login from './components/Login'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => <Route exact path="/login" component={Login} />

export default App
