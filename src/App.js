
import './App.css';
import {useState,useEffect} from 'react';
import Topbar from './components/Topbar/Topbar';
import db from './firebase_config';
import { collection,addDoc,serverTimestamp, onSnapshot} from '@firebase/firestore';
import ProjectList from './components/Projects/ProjectList';
import SentList from './components/SentList/SentList';
import WonList from './components/WonList/Won';
import Ongoing from './components/OngoingList/Ongoing';
import { useAuth } from './firebase_config';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';






function App() {
  const [projectValue, setProject] = useState("");
  const [proj,setProjValue]=useState([])
  const [sent,setSent]=useState([])
  const [won,setWon]=useState([])
  const [ongoing,setOngoing]=useState([])
  
function getProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setProjValue((snapshot.docs.filter((doc)=> doc.data().inprogress===0))
  .map((doc)=> ({id:doc.id ,project:doc.data().project}))))  
  
}



function sentEstimateProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setSent((snapshot.docs.filter((stuff)=> stuff.data().inprogress===1))
  .map((stuff)=> ({id:stuff.id ,project:stuff.data().project}))))    
}


function wonProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setWon((snapshot.docs.filter((won)=> won.data().inprogress===2))
  .map((won)=> ({id:won.id ,project:won.data().project}))))    
}


function OngoingProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setOngoing((snapshot.docs.filter((on)=> on.data().inprogress===3))
  .map((on)=> ({id:on.id ,project:on.data().project}))))    
}
useEffect(() => 
getProject()
  , [])
 
  useEffect(() => 
  sentEstimateProject()
  
    , [])

    useEffect(() => 
    wonProject()
      , [])

      useEffect(() => 
    OngoingProject()
      , [])
  async function addProject(e){
    e.preventDefault()
 const collectionRef = collection(db,"projects");
 const payload= {inprogress:0,
  project:projectValue,
timeStamp:serverTimestamp()};
setLoading(true)
  await addDoc(collectionRef,payload)
  setProject("")
  setLoading(false)
  }
  
  const {logout}=useAuth()
  const[loading,setLoading]=useState(false)
  const Navigate=useNavigate()
  
  async function handleLogout (){
  
    try{
      setLoading(true)
      await logout()
      //setLoading(false)
      Navigate("/signin")
     
    }catch{
      alert("Error")
    }
  
  }

  
  return (
<div className="App">
      <Button disabled={loading} onClick={handleLogout}> LOGOUT</Button>
        <Topbar addProject={addProject} projectValue={projectValue} setProject={setProject}/>

       <div className="container"> 
     
       <div className="projBody">
       <h1 style={{fontSize:"15px"}}>Estimates</h1> 
        {proj.map((projList)=>(<ProjectList key={projList.id} 
        project= {projList.project} 
        inprogress={projList.inprogress} 
        id={projList.id}
       
        />))}
       </div>
       
       <div className="sent">
       <h1 style={{fontSize:"15px"}}>Sent Estimates</h1> 
       {sent.map((newList)=>(
       <SentList key={newList.id} 
       project= {newList.project} 
       inprogress={newList.inprogress} 
       id={newList.id}
       />))}
       </div>

       <div className="won">
       <h1 style={{fontSize:"15px"}}>Won Projects</h1> 
       {won.map((wonList)=>(
       <WonList key={wonList.id} 
       project= {wonList.project} 
       inprogress={wonList.inprogress} 
       id={wonList.id}
       />))}
       </div>

       <div className="ongoing">
       <h1 style={{fontSize:"15px"}}>Ongoing Projects</h1> 
       {ongoing.map((ongoingList)=>(
       <Ongoing key={ongoingList.id} 
       project= {ongoingList.project} 
       inprogress={ongoingList.inprogress} 
       id={ongoingList.id}
       />))}
       </div>
       </div>
    
  
    </div>
)
}
export default App;
