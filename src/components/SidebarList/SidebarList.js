import React from 'react'
import "./SidebarList.css"
function SidebarList({id,title, active,setNavselected}) {

    return (
        <div>
             <div className={active?"DashbarList active":"DashbarList"} onClick={()=>setNavselected(id)}>
             {title}
        </div>
        </div>
    )
}

export default SidebarList
