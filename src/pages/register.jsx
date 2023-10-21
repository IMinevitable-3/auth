import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";
const API_URL = "api/user/register/";

export function Register() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [User, setUser] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      await axios.post(API_URL, User).then((resp) => {
        if ("error" in resp.data) {
          setError({ message: "choose another username" });
          setStatus("typing");
        } else {
          console.log(resp.data);
          const accToken = resp.data.access;
          const refToken = resp.data.refresh;
          // setAuth({ User, access: accToken, refresh: refToken });
          // console.log(User)
          navigate(from, { replace: true });
        }
      });
    } catch (error) {
      setError("No message from server");
      setStatus("typing");
      throw error;
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
          id="usr"
          value={User.username}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
        <br />
        <label htmlFor="mail">Email</label>
        <input
          type="text"
          name="email"
          id="mail"
          value={User.email}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
        <br />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="password"
          id="pass"
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
