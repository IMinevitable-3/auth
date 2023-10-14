import { Link } from "react-router-dom";
export function Index() {
  console.log(import.meta.env.REACT_APP_ENV)
  return (
    <>
      <h1>hello !!</h1>
      <Link to="login">login</Link>
    </>
  );
}
