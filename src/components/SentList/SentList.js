import React from 'react'
import { doc,updateDoc,deleteDoc} from '@firebase/firestore';
import { Button, ListItem, ListItemText } from "@mui/material";
import db from "../../firebase_config";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import "./SentList.css"

function SentList({id ,project,inprogress}) {

    async function wonToggle(){
        const docRef = doc(db,"projects",id);
     const payload= {inprogress:2};
      await updateDoc(docRef,payload) 
    }

    async function deleteDocument(){
        const docRef = doc(db,"projects",id);
       await deleteDoc(docRef)
    }

    return (
        <div className="container2"> 
 <div className="slist">  
 <Box sx={{ width: '150px', maxWidth: 360 }}>
  <nav aria-label="main mailbox folders"></nav>
  <List disablePadding>       
<ListItem>
<ListItemText primary={project} secondary={inprogress ?"won":"sent"}/>
</ListItem> 
</List>
</Box>
</div>
<div className="button1">
<Button style={{fontSize:"10px"}}onClick={wonToggle}>
    next stage
</Button>
<Button onClick={deleteDocument}>
🗑️
</Button>
        </div>
        </div>
        
    )
}

export default SentList
