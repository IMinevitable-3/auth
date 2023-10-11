import { useContext } from "react";
import { accessContext } from "./authprovider";

export function Dashboard() {
  let context = useContext(accessContext);
  return (
    <>
      <h1>Dashboard {context}</h1>
    </>
  );
}
