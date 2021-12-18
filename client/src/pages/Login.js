import React, {useState} from 'react';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginUser(event)
  {
    event.preventDefault();
    fetch('http://localhost:1337/api/login',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)     //{status: 'ok', user: token}
      if(data.user)
      {
        localStorage.setItem('token',data.user)
        alert('Login successful')
        window.location.href='/dashboard'
      }
      else
      {
        alert('Please check your username and password')
      }
      console.log(data)
    })
    .catch(err=>{console.log(err)})
  }

  return (
    <div className="App" id="login-app">
      <hr/>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
