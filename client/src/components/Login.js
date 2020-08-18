import React, {useState} from "react";
import {axiosWithAuth} from '../api/axiosWithAuth';

const Login = props => {
  const [credentials, setCredentials] = useState({});
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = e => {
    e.preventDefault();
    axiosWithAuth().post('http://localhost:5000/api/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.payload);
        console.log(response);
        props.history.push('/BubblePage')
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const removeToken = () => {
    localStorage.removeItem('token');
  }

  return (
    <div className='loginContainer'>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
      <button onClick={removeToken}>Remove Token</button>
    </div>
  )
};

export default Login;
