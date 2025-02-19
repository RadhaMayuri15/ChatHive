import React from 'react';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { UserContext } from './UserContext';

axios.defaults.withCredentials = true;

function RegisterAndLoginForm() {

  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [isLoginOrRegister, setIsLoginOrRegister]=useState('register')
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext)

  async function handleSubmit(ev){
    ev.preventDefault();
    const url= isLoginOrRegister==='register' ? 'register' : 'login';
    const {data} = await axios.post(`http://localhost:1234/${url}`, {username, password})
    setLoggedInUsername(username)   
    setId(data.id);
  }

  // check if user is logged in when page loads
  useEffect(() => {
    axios.get('http://localhost:1234/profile')
      .then(({ data }) => {
        setLoggedInUsername(data.userData.username);
        setId(data.userData.userId);
      })
      .catch(() => {
        setLoggedInUsername(null);
        setId(null);
      });
  }, []);

  return (
    <div className='container my-5'>
      <h1 className='text-center'>{isLoginOrRegister==='register' ? 'Register' : 'Login'}</h1>
      <form className='w-50 mx-auto' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" 
              value={username} 
              onChange={ev=>setUsername(ev.target.value)} 
              className="form-control" 
              id="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
              type="password" 
              value={password} 
              onChange={ev=>setPassword(ev.target.value)}  
              className="form-control" 
              id="password" />
        </div>
          <div className="text-center mt-2">
            <button type="submit" className="btn btn-outline-primary">{isLoginOrRegister==='register' ? 'Register' : 'Login'}</button>
            {isLoginOrRegister==='register' && (
              <div >
                Already a member? 
                <button className='btn btn-outline-primary' onClick={()=> setIsLoginOrRegister('login')}>Login here</button>
              </div>
              )}
          </div>
        {isLoginOrRegister==='login' && (
          <div className="text-center mt-2">
          Don't have an account? 
          <button className='btn btn-outline-primary' onClick={()=> setIsLoginOrRegister('register')}>Register here</button>
        </div>
        )}
      </form>
    </div>
  );
}

export default RegisterAndLoginForm;
