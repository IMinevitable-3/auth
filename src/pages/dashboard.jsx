import { Link } from "react-router-dom";
export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/users">Users page</Link>
    </>
  );
};
