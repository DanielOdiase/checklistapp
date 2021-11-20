import React from "react";
import { doc,updateDoc,deleteDoc} from '@firebase/firestore';
import { Button, ListItem, ListItemText } from "@mui/material";
import db from "../../firebase_config";
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import "./Ongoing.css"

function Ongoing({project,inprogress,id}){

    async function OngoingToggle(){
        const docRef = doc(db,"projects",id);
     const payload= {inprogress:3};
      await updateDoc(docRef,payload) 
    }

    async function deleteDocument(){
        const docRef = doc(db,"projects",id);
       await deleteDoc(docRef)
    }

  
return(
        <div className="wonContainer" style={{display:"flex"}}> 
        <Box sx={{ width: '150px', maxWidth: 360 }}>
  <nav aria-label="main mailbox folders"></nav>
  <List>
<ListItem>
<ListItemText primary={project} secondary={inprogress ?"completed":"ongoing"} />
</ListItem>
</List>
</Box>
<Button style={{fontSize:"10px"}} onClick={OngoingToggle}>
  next stage
</Button>
<Button onClick={deleteDocument}>
🗑️
</Button>
  </div>  
  
  
)
}

export default Ongoing