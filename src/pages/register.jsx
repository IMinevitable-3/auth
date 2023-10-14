import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
const API_URL  = import.meta.env.REACT_APP_API +'api/user/register/' ;

export function Register() {
  const [User, setUser] = useState({ username: "", password: ""  , email:""});
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <Navigate to="/dashboard" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      await axios.post(API_URL , User)
      .then(resp =>{
        if( 'error' in resp.data ){
          setError({ message: "choose another username" });
          setStatus("typing");
        }
        else 
        setStatus("success");
    
      })
      
    } catch (error) {
      console.log("errror") 
    }

  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usr">Username</label>
        <input
          type="text"
          name="username"
          id = "usr"
          value={User.username}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
        <br />
        <label htmlFor="mail">Email</label>
        <input
          type="text"
          name="email"
          id = "mail"
          value={User.email}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
        <br />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="password"
          id = "pass"
          value={User.password}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
        <br />
        <button
          disabled={
            User.username.length === 0 ||
            User.password.length === 0 ||
            status === "submitting"
          }
        >
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}

      </form>
    </>
  );
}
