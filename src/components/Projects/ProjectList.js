import React, {useState } from "react";
import { doc,updateDoc,deleteDoc} from '@firebase/firestore';
import { Button, ListItem, ListItemText} from "@mui/material";
import db from "../../firebase_config";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import "./ProjectList.css"
let count=1;
let ncount;
function ProjectList({project,inprogress,id,description}){
  
const [lineState, setlineState] = useState(true)


async function toggleInProgress(){
      ncount=count++
        setlineState(false)
        const docRef = doc(db,"projects",id);
     const payload= {inprogress:1};
      await updateDoc(docRef,payload) 
      if (ncount===4){
         await deleteDoc(docRef)
      }
    }
   
    async function deleteDocument(){ 
        const docRef = doc(db,"projects",id);
       await deleteDoc(docRef)
    }  

return(
        <div className="container1" style={{display:"flex"}}> 
     <div className="list" >
<Box sx={{ width: '150px', maxWidth: 360}}>
  <nav aria-label="main mailbox folders"></nav>
  <List disablePadding>
<ListItem className="listIT">
<ListItemText primary={project} secondary={inprogress?"sent":"estimate"&& description} style={lineState?{textDecoration:'none'}:{textDecoration:'line-through'}}  />
</ListItem>
</List>
</Box>
</div>

<div className="button" >
  <form onSubmit={toggleInProgress}>
  <div className="nextdiv">
<Button style={{fontSize:'15px',color:"#FABB18"}} onClick={toggleInProgress}>
  {`>>`}
</Button>
</div>
</form>
<div className="deletediv">
<Button onClick={deleteDocument}>
🗑️
</Button>
</div>
</div>
  </div>  
  
  
)
}


export default ProjectList