import React from "react";
import { doc,updateDoc,deleteDoc} from '@firebase/firestore';
import { Button, ListItem, ListItemText} from "@mui/material";
import db from "../../firebase_config";

import Box from '@mui/material/Box';
import List from '@mui/material/List';




import "./ProjectList.css"
let count=0;
let ncount;
function ProjectList({project,inprogress,id}){

    async function toggleInProgress(){
        
        ncount=count++
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
<ListItemText primary={project} secondary={inprogress ?"sent":"estimate"}  />
</ListItem>
</List>
</Box>
</div>

<div className="button" >
<Button style={{fontSize:'10px'}} onClick={toggleInProgress} >
next stage
</Button>
<Button onClick={deleteDocument}>
🗑️
</Button>
</div>
  </div>  
  
  
)
}


export default ProjectList