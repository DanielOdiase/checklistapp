import React from 'react'
import "./EstimateList.css" 

function EstimateList({id,title, active,setEstimateSelected}) {
    return (
        <div>
            <h1 className={active?"EstimateList active":"EstimateList"} onClick={()=>setEstimateSelected(id)}>{title}</h1> 
        </div>
    )
}

export default EstimateList
