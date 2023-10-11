import { createContext } from "react";

export const accessContext = createContext(
  localStorage.getItem("access_token") || null
);
export const refreshContext = createContext(
  localStorage.getItem("refresh_token") || null
);

export function Auth() {
  return <></>;
}
