import {useContext} from 'react'
import axios from 'axios'
import Routes from './Routes.jsx'
import UserContextProvider from './UserContext.jsx';
import {UserContext} from './UserContext.jsx';
function App() {
  axios.defaults.baseURL='http://localhost:3000';
  axios.defaults.withCredentials = true; // to set cookies from API
  
  return (
    <div>
      <UserContextProvider>
      <Routes />
      </UserContextProvider>
    </div>
  )
}

export default App