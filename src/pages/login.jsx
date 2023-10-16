import { useState  } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from './useAuth'
import axios from "./axios";
const LOGIN_URL = 'api/user/login/'
export function Login() {
  const { setAuth }  = useAuth() 
  const [User, setUser] = useState({ username: "", password: "" });
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
      await axios.post(LOGIN_URL , User)
      .then(resp =>{
        if( 'error' in resp.data ){
          setError({ message: resp.data.error } ) ;
          setStatus("typing");
        }
        else{
          const accToken = resp.data.access 
          const refToken = resp.data.refresh 
          setAuth({accToken , refToken}) 
          setStatus("success");
        } 
      })
      
    } catch (error) {
      setStatus("typing") 
      throw error 
    }
  }

  function handleTextareaChange(e) {
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
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="password"
          id = "pass"
          value={User.password}
          onChange={handleTextareaChange}
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

