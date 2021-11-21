import React from 'react'
import TextField from '@mui/material/TextField';
import "./Topbar.css"
function Topbar({addProject,projectValue,setProject}) {
    return (
        <div className="text">
            <h1 className="heading">What's the Project status?</h1>
        <form onSubmit={addProject}>
       <TextField id="standard-basic" 
       label="Please enter Project" 
       variant="standard" value={projectValue} 
       onChange={(e)=>setProject(e.target.value)} 
       style={{width: "90vw", maxWidth: "500px" }}/> 
       </form>
        </div>
    )
}

export default Topbar
