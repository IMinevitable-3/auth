import { useState  , useEffect , useRef  } from "react";
import {Link , useNavigate ,useLocation} from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const LOGIN_URL = 'api/user/login/'
export function Login() {
  const {setAuth} = useAuth()
  const userRef = useRef() 
  const [User, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const navigate = useNavigate() 
  const location = useLocation() 
  const from = location.state?.from?.pathname || "/" ;

  useEffect(()=>{
    userRef.current.focus() ;
  },[]) 

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      await axios.post(LOGIN_URL , User,headers) 
      .then(resp =>{
        if( 'error' in resp.data ){
          setError({ message: resp.data.error } ) ;
          setStatus("typing");
        }
        else{
          const accToken = resp.data.access 
          const refToken = resp.data.refresh 
          setAuth({User , accToken , refToken})
          console.log(accToken)
          navigate(from,{replace:true}) 
        } 
      })
      
    } catch (error) {
      if(!error?.response) {
        setError("No message from server") 
      }
      setStatus("typing") 
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
          ref = {userRef}
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
