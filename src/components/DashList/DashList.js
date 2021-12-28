import React,{useState,useEffect} from 'react'
import "./DashList.css"
import Dash from '../Dash/Dash';
import Tasksection from '../TaskSection/Tasksection';
import ProjectList from '../Projects/ProjectList';
import Crypto from '../CryptoSection/Crypto';
import WeatherSection from '../WeatherSection/WeatherSection';


function DashList({proj,loadingStage,setloadingStage}) {
 
     const [listselected, setListselected] = useState("tasks") 
        const [selectedArr, setSelectedArr] = useState([])

    const Dashlist = [
        {
                 id: "tasks",
                 title: "Tasks",
               },
               {
                 id: "sports",
                 title: "Sports",
               },
               {
                 id: "crypto",
                 title:"Crypto",
               },
               {
                 id: "weather",
                 title: "Weather",
               },
             ];    
             
        useEffect(() => {
           setloadingStage(true)
       }, [])//eslint-disable-line react-hooks/exhaustive-deps

            useEffect(() => {
                switch(listselected){
                 case "tasks":
                  setloadingStage(true)
                setSelectedArr([])
                 break;
                 case "sports":
                     setloadingStage(false)
                   setSelectedArr(<Tasksection/>);
                   break; 
                   case "crypto":
                     setloadingStage(false)
                   setSelectedArr(<Crypto/>);
                   break;  
                   case "weather":
                     setloadingStage(false)
                   setSelectedArr(<WeatherSection listselected={listselected}/>);
                   break;   
                   default:
                    setSelectedArr(proj.map((projList)=>(<ProjectList key={projList.id} 
                        project= {projList.project} 
                        description={projList.description}
                        inprogress={projList.inprogress} 
                        id={projList.id}
                        />))
                );          
                }
              }, [listselected])//eslint-disable-line react-hooks/exhaustive-deps
              
    return (
        <div >
            <div className="listbody">
                {Dashlist.map((item)=>
               <Dash key={item.id} 
               id={item.id} 
               title={item.title} 
               active={listselected===item.id} 
               setListselected={setListselected} />)} 
               </div>
               <div>{selectedArr}</div>
               

        </div>
    )
}

export default DashList
