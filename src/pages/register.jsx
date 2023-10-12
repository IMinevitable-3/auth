import { useState } from "react";
import { Navigate } from "react-router-dom";
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
    try {
      await submitForm(User);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
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

function submitForm(User) {
  // Pretend it's hitting the network.
  console.log(User.email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = false;
      if (shouldError) {
        reject(new Error("Invalid User"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
