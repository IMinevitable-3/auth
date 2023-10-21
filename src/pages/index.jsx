import { Link } from "react-router-dom";
export const Index = () => {
  return (
    <>
      <h1>Home !!!</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>

    </>
  );
};
