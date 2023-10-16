import { Outlet } from "react-router-dom";
export function Layout  (){
    return (
        <div className="App">
            <Outlet/> 
            {/* represents all the children of Layout component  */}
        </div>
    )
}