import React from 'react'
import "./Sidebar.css"

import { NavLink } from 'react-router-dom';

function Sidebar() {
   
           
    return (
        <div className="s-bar">
            <div className="d-div">
               <NavLink className="dashboard-link"style={{textDecoration:"none",color:"black" }}to ="dashboard">Dashboard</NavLink>
               <NavLink className="estimates-link"style={{textDecoration:"none", color:"black"}}to ="estimates">Estimates</NavLink>
               <NavLink className="projectsection-link"style={{textDecoration:"none",color:"black"}}to ="projectsection">Projects</NavLink>
               </div>
           
        </div>
    )
}

export default Sidebar
