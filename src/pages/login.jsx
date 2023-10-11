import { useState } from "react";
import { Navigate } from "react-router-dom";
export function Login() {
  const [User, setUser] = useState({ username: "", password: "" });
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={User.username}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
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

function submitForm(User) {
  // Pretend it's hitting the network.
  console.log(User.username);
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
