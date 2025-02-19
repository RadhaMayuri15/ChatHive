import {createContext, useEffect, useState} from 'react'
import axios from 'axios';
export const UserContext=createContext({});

function UserContextProvider({children}) {
    const [username, setUsername]=useState(null);
    const [id, setId] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:1234/profile').then(response=>{
            setId(response.data.userId);
            setUsername(response.data.username);
        })
        .catch(error=>console.error("Error fetching profile: ", error));
    }, []);
  return (
    <UserContext.Provider value={{username, setUsername, id, setId}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider