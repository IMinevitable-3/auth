import { useState , useEffect } from "react";
import { useAxiosPrivate } from "../hooks/useAxios";
// import { useRefreshToken } from "../hooks/useRefreshToken";
import { Link } from "react-router-dom";
const URL = 'api/admin/'
export const Users = () =>{
    const [users , setUsers] = useState()
    // const refreshfunc = useRefreshToken() ;
    const axiosPrivate = useAxiosPrivate()
    useEffect(()=>{
        let isMounted = true 
        const controller = new AbortController()

        const getUsers = async ()=>{
            try {
                const resp = await axiosPrivate.get(URL , {
                    signal :controller.signal 
                })  
                // console.log(resp.data)
                isMounted && setUsers(resp.data)
            }
            catch(err){
                    throw err ;
            }
        }
        getUsers()
        return ()=>{
            isMounted = false 
            controller.abort()
        }
        //clean up of useEffect
    },[])
    return (
        <article>
            {users?.length
                ?(
                    <ul>
                        {users.map((user,i)=> <li key ={i}>{user?.username}</li>)}
                    </ul>
                ):<h3>no users</h3>
            }
            {/* <button onClick={()=>refreshfunc()}></button> */}
            <Link to="/dashboard">Dashboard</Link>
        </article>
    )
}