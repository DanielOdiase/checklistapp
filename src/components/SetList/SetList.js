import React from 'react'
import "./SetList.css"

function SetList({id,title, active,setSelected}) {
    return (
        <div className="newl">
            <h1 className={active?"SetList active":"SetList"} onClick={()=>setSelected(id)}>{title}</h1>
        </div>
    )
}

export default SetList
