import React from 'react'
import "./Dash.css"
function Dash({id,title, active,setListselected}) {
    return (
        <div className={active?"DashList active":"DashList"} onClick={()=>setListselected(id)}>
             {title}
        </div>
    )
}

export default Dash
