import {useContext} from 'react'
import {UserContext} from './UserContext';
import RegisterAndLoginForm from './RegisterAndLoginForm';

function Routes() {
    const {username, id} = useContext(UserContext);
    
    if(username){
        return "hey there who logged in. Good to see you " + username
    }
  return (
    <div>
        <RegisterAndLoginForm />
    </div>
  )
}

export default Routes