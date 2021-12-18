import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function registerUser(event)
  {
    event.preventDefault();
    fetch('http://localhost:1337/api/register',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.status==='ok')
      {
        navigate('/login')
      }
    })
    .catch(err=>{console.log(err)})
  }

  return (
    <div className="App" id="register-app">
      <hr/>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          type="text" 
          placeholder="Name"
        />
        <br/>
        <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email" 
          placeholder="Email"
        />
        <br/>
        <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password" 
          placeholder="Password"
        />
        <br/>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
