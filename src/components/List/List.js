
import React,{useState,useEffect}from 'react'
import SetList from '../SetList/SetList';
import "./List.css"
import WonList from '../WonList/Won';
import Ongoing from '../OngoingList/Ongoing';


function List({won,ongoing}) {
    const [selected,setSelected]= useState("won")
    const [newData, setNewData] = useState([])

    const list = [
               {
                 id: "won",
                 title:"WonProjects",
               },
               {
                 id: "ongoing",
                 title: "OngoingProjects",
               }
               ];    

             useEffect(() => {
              switch(selected){
               case "won":
                 setNewData(won.map((wonList)=>(
                  <WonList key={wonList.id} 
                  project= {wonList.project} 
                  inprogress={wonList.inprogress} 
                  description={wonList.description}
                  id={wonList.id}
                  />)));
                 break;
                 case "ongoing":
                   
                  setNewData(ongoing.map((ongoingList)=>(
                    <Ongoing key={ongoingList.id} 
                    project= {ongoingList.project} 
                    inprogress={ongoingList.inprogress} 
                    description={ongoingList.description}
                    id={ongoingList.id}
                    />)));
                  break;
                  default:
                    setNewData(won.map((wonList)=>(
                      <WonList key={wonList.id} 
                      project= {wonList.project} 
                      inprogress={wonList.inprogress} 
                      description={wonList.description}
                      id={wonList.id}
                      />)));             
              }
            }, [selected])// eslint-disable-line react-hooks/exhaustive-deps
            
    return (
        <div className="listcont">
            <div className="listi">
                {list.map((item)=>
               <SetList key={item.id} 
               id={item.id} 
               title={item.title} 
               active={selected===item.id} 
               setSelected={setSelected} />)} 
               </div>
               <div className="projectlistsection">
               {newData}
               </div>
               
        </div>
    )
}

export default List
