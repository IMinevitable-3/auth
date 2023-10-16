import { useLocation , Navigate , Outlet } from "react-router-dom";
import {useAuth }from "../hooks/useAuth";
// can protect all child components inside it 
export const RequireAuth = ()=>{
    const {auth} = useAuth() 
    const location = useLocation() 
     return (
        auth?.User ?
        <Outlet/>
        :<Navigate to = "/login" state={{from:location}} replace />
     )
}
export default RequireAuth ;