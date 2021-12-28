import React, {useState} from 'react'
import { doc,updateDoc,deleteDoc} from '@firebase/firestore';
import { Button, ListItem, ListItemText } from "@mui/material";
import db from "../../firebase_config";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import "./SentList.css"

function SentList({id ,project,inprogress,description}) {
    const [lineState, setlineState] = useState(true)
    let count=1;
    let ncount;
    async function wonToggle(){
       ncount=count++
       setlineState(false)
        const docRef = doc(db,"projects",id);
     const payload= {inprogress:2};
      await updateDoc(docRef,payload) 
      if (ncount===4){
        await deleteDoc(docRef)
      }
    }

    async function deleteDocument(){
        const docRef = doc(db,"projects",id);
       await deleteDoc(docRef)
    }

    return (
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
  <form onSubmit={wonToggle}>
  <div className="nextdiv">
<Button style={{fontSize:'15px',color:"#FABB18"}} onClick={wonToggle}>
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

export default SentList
