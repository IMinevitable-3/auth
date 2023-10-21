import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";

export const PersistenceLogin = () => {
  const [isloading, setIsLoading] = useState(true); 
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        throw err;
      }
      finally{
        setIsLoading(false)
      }
    };
    !auth?.access ? verifyRefreshToken() : setIsLoading(false);

  }, []); 

  useEffect(() => {
    console.log(`auth -> ${JSON.stringify(auth?.access)}`);
  }, [isloading]);

  return (
    <>
      {isloading ? <h1>Loading</h1> : <Outlet />}
    </>
  );
};
