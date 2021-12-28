import React,{useState,useEffect} from 'react'
import "./Rightbar.css"
import TextField from '@mui/material/TextField';
import { Calendar,dateFnsLocalizer }from "react-big-calendar";
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay/index'
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { addMinutes } from 'date-fns'
import { useAuth,upload } from '../../firebase_config';
import db from '../../firebase_config';
import { collection,addDoc,onSnapshot,Timestamp} from '@firebase/firestore';


const locales= {
    "en-US":require("date-fns/locale/en-US")
}

const localizer =dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})



function Righbar({addProject,setProject,projectValue,setProjectDescription,projectDescription,nameValue}) {

    const [newEvent, setNewEvent] = useState({title:"",start:"",end:""})
    const [allEvents, setAllEvents] = useState([])
    const [stage, setStage] = useState(true)
    const [eventStage, setEventStage] = useState(true)
    const { currentUser } = useAuth()
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
  
   async function handleEvents(e){
        e.preventDefault()
        if (newEvent.start.length===0){
            alert("please enter values")
        }else{
            
            const TaskRef = collection(db,"tasks");
            const Timeload= {
            title:newEvent.title,
            userId:currentUser.uid,
             start:Timestamp.fromDate(newEvent.start),
             end:Timestamp.fromDate(newEvent.end)};
            setLoading(true)
            await addDoc(TaskRef,Timeload)
           // setAllEvents([...allEvents,newEvent])
            setNewEvent({title:"",start:"",end:""})
            setLoading(false)
        }
    }
    function getTasks(){
        onSnapshot(collection(db,"tasks"),(snapshot)=>
        setAllEvents((snapshot.docs.filter((doc)=> doc.data().userId===currentUser.uid))
            .map((doc)=> ({title:doc.data().title,start:doc.data().start.toDate(),end:doc.data().end.toDate()}))))
      }
    
      
    function handleClick(){
        setStage(!stage)
    }
    function handleEventClick(){
        setEventStage(!eventStage)
    }
    function handleImgChange(e){
     if(e.target.files[0]){
         setPhoto(e.target.files[0])
     }
    }
    function handleImgClick(){
        upload(photo,currentUser,setLoading)
        
    }

    useEffect(() => {
        if (currentUser?.photoURL){
        setPhotoURL(currentUser.photoURL) 
        }
    }, [currentUser])

useEffect(() => {
  getTasks()
}, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="rbar">
            <div className="topcontainer">
                <div className="imgpic">
                    <img src={photoURL} className="avatar" alt=""/> 
                </div>
                <div className="description">
                    {nameValue.map((oc)=>( <div key={oc.email}><h1>
                    {oc.name}
                    </h1><p>{oc.occupationState}</p></div>))}
                    
                    <input type="file" onChange={handleImgChange} style={{cursor:"pointer"}}/>
                    <button disabled={loading|| !photo} onClick={handleImgClick} className="uploadbutt">Upload</button>
                   
                </div>
            
            </div>
            <div className="taskbtn"> 
            <button style={{width:"200px",height:"17%",marginTop:"10px" ,cursor:"pointer"}} onClick={handleClick}>{stage?"Add Estimate":"X"}</button>
          <button style={{width:"200px",height:"17%",marginTop:"10px" ,marginLeft:"10px",cursor:"pointer"}} onClick={handleEventClick}>{eventStage?"Add Event":"X"}</button>
            </div>  
             <div className="form-container">
              <div className={stage?"eventform active":"eventform"} > 
              <form onSubmit={addProject} style={{display:"flex",flexDirection:"column",marginLeft:"40px"}}>
              <TextField id="standard-basic" 
                label="Please enter Project" 
                required
                variant="standard" value={projectValue}
              onChange={(e)=>setProject(e.target.value)}
              style={{width: "90vw", maxWidth: "200px" }}/> 
              <TextField id="standard-basic" 
                label="Please enter Description" 
                required
                variant="standard" value={projectDescription} 
              onChange={(e)=>setProjectDescription(e.target.value)} 
              style={{width: "90vw", maxWidth: "200px",marginTop:"30px"}}/> 
                 <button style={{width:"200px",height:"17%",marginTop:"10px",cursor:"pointer"}}> Add Estimate</button>
              </form>
              </div>
              <div className={eventStage?"eventDiv active":"eventDiv"}>
              <form onSubmit={handleEvents} style={{marginLeft:"40px"}}>
              <input type= "text" placeholder="Enter task" style ={{marginTop:"20px",height:"40%"}} value={newEvent.title} required
                   onChange={(e)=>setNewEvent({...newEvent,title: e.target.value})} />
                   <DatePicker placeholderText="Start Date" style={{maxWidth:"200px",marginRight:"10px",height:"40%"}}
                   selected={newEvent.start} required onChange={(start)=>setNewEvent({...newEvent,start})} />
                    <DatePicker placeholderText="End Date" style={{width:"200px",marginRight:"10px",height:"40%"}}
                   selected={newEvent.end} required onChange={(end)=>setNewEvent({...newEvent,end})} />
                   <button style={{width:"150px",height:"17%",marginTop:"10px" ,cursor:"pointer"}} onClick={handleEvents}>
                       Add Event
                   </button>
            </form>
                </div>  
                </div> 
                <div className="calendar">
              <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor={(e)=>{return addMinutes(new Date(e.end),1)}}
              style={{height:530,margin:"30px"}}/>
          </div>

        </div>
    )
}

export default Righbar
