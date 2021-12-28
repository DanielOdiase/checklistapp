
import './App.css';
import React,{useState,useEffect} from 'react';
import db from './firebase_config';
import { collection,addDoc,serverTimestamp, onSnapshot} from '@firebase/firestore';
import { useAuth } from './firebase_config';
import { Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import Sidebar from "./components/Sidebar/Sidebar.js"
import Righbar from './components/Rightbar/Righbar';
import DashBoardSection from './components/DashBoardSection/DashBoardSection';
import {Routes,Route} from 'react-router-dom'
import List from "./components/List/List.js"
import EstimateSection from './components/EstimateSection/EstimateSection';




function App() {
  //Reusable states
  const [projectValue, setProject] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [proj,setProjValue]=useState([])
  const [sent,setSent]=useState([])
  const [won,setWon]=useState([])
  const [ongoing,setOngoing]=useState([])
  const [newData,setNewData]= useState([])
  const { currentUser } = useAuth()
  const [nameValue, setNameValue] = useState([])

  //Code to get/Fetch project from firebase. Fetches the data through filter method and returns data with specified inprogress values
function getProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setProjValue((snapshot.docs.filter((doc)=> doc.data().inprogress===0 && doc.data().userId===currentUser.uid))
  .map((doc)=> ({id:doc.id ,project:doc.data().project,description:doc.data().description}))))  
}
function getName(){
  onSnapshot(collection(db,"users"),(nameshot)=>
  setNameValue((nameshot.docs.filter((n)=> n.data().email===currentUser.email))
  .map((n)=> ({id:n.id ,name:n.data().name,occupationState:n.data().occupationState,email:n.data().email}))))  
}

function sentEstimateProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setSent((snapshot.docs.filter((stuff)=> stuff.data().inprogress===1&&stuff.data().userId===currentUser.uid))
  .map((stuff)=> ({id:stuff.id ,project:stuff.data().project,description:stuff.data().description}))))    
}

function wonProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setWon((snapshot.docs.filter((won)=> won.data().inprogress===2&&won.data().userId===currentUser.uid))
  .map((won)=> ({id:won.id ,project:won.data().project,description:won.data().description}))))    
}

function OngoingProject(){
  onSnapshot(collection(db,"projects"),(snapshot)=>
  setOngoing((snapshot.docs.filter((on)=> on.data().inprogress===3 && on.data().userId===currentUser.uid))
  .map((on)=> ({id:on.id ,project:on.data().project,description:on.data().description}))))    
}

// Use Effect method to listen,call and mount functions everytime page is refreshed 

useEffect(()=> 
 getProject()
  ,[])//eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => 
  getName()
    , [])//eslint-disable-line react-hooks/exhaustive-deps
 
  useEffect(() => 
  sentEstimateProject()
    , [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => 
    wonProject()
      , [])//eslint-disable-line react-hooks/exhaustive-deps

      useEffect(() => 
    OngoingProject()
      , [])//eslint-disable-line react-hooks/exhaustive-deps

  //asynchronous function call to add estimates. 
  async function addProject(e){
    e.preventDefault()
 const collectionRef = collection(db,"projects");
 const payload= {inprogress:0,
  project:projectValue,
  userId:currentUser.uid,
  description:projectDescription,
  timeStamp:serverTimestamp()};
  setLoading(true)
  await addDoc(collectionRef,payload)
  setProject("")
  setProjectDescription("")
  setLoading(false)
  }
  
  //imports from firebase_config component page 
  const {logout}=useAuth()
  const[loading,setLoading]=useState(false)
  const Navigate=useNavigate()
  
//Async logout function 
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
<div>
      <div className="side-b"> 
        <Sidebar />
        </div>
        
       <div className="container"> 
       <Button disabled={loading} onClick={handleLogout}>LOGOUT</Button>
       <Outlet />
        
       <Routes>
        <Route path="dashboard" element={<DashBoardSection proj={proj} addProject={addProject} projectValue={projectValue} setProject={setProject} nameValue={nameValue} />}/>
        <Route path ="projectsection" element={<List proj={proj} sent={sent} won={won} ongoing={ongoing} newData={newData} setNewData={setNewData}/> }/>
        <Route path ="estimates" element={<EstimateSection proj={proj} sent={sent} won={won} ongoing={ongoing}/>}/>
         </Routes> 
        </div>
       <div className="Rightbar">
         <Righbar addProject={addProject} setProject={setProject} projectValue={projectValue} setProjectDescription={setProjectDescription} projectDescription={projectDescription} nameValue={nameValue} />
       </div>
    
  
    </div>
)
}
export default App;
