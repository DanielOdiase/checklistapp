
import React,{useState,useEffect}from 'react'
import SetList from '../SetList/SetList';
import ProjectList from '../Projects/ProjectList';
import "./List.css"


function List({proj,sent,won,ongoing}) {
    const [selected,setSelected]= useState("estimate")
    const [newData,setNewData]=useState([])
    
    const list = [
        {
                 id: "estimate",
                 title: "Estimate",
               },
               {
                 id: "sent Estimates",
                 title: "SentEstimates",
               },
               {
                 id: "won",
                 title:"WonProjects",
               },
               {
                 id: "ongoing",
                 title: "OngoingProjects",
               },
             ];    
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
               
        </div>
    )
}

export default List
