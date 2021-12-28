import React,{useState,useEffect}from 'react'
import EstimateList from '../EstimateList/EstimateList'
import "./EstimateSection.css"
import SentList from '../SentList/SentList'
import ProjectList from '../Projects/ProjectList'

function EstimateSection({proj,sent}) {

    const [EstimateSelected,setEstimateSelected]= useState("estimate")
    const [newEstimateData,setNewEstimateData]=useState([])
   function prevd(){
    switch(EstimateSelected){
      case "estimate":
        setNewEstimateData(proj.map((projList)=>(<ProjectList key={projList.id} 
          project= {projList.project} 
          inprogress={projList.inprogress}
          description={projList.description} 
          userId={projList.userId}
          id={projList.id}
          />)));
        break;
        case "sent Estimates":
         setNewEstimateData(sent.map((newList)=>(
          <SentList key={newList.id} 
          project= {newList.project} 
          inprogress={newList.inprogress} 
          userId={newList.userId}
          description={newList.description} 
          id={newList.id}
          />)));
         break; 
         default:
          setNewEstimateData(proj.map((projList)=>(<ProjectList key={projList.id} 
            project= {projList.project} 
            inprogress={projList.inprogress}
            description={projList.description} 
            userId={projList.userId}
            id={projList.id}
            />)))       
     }
   }
    const estimatelist = [
        {
                 id: "estimate",
                 title: "Estimate",
               },
               {
                 id: "sent Estimates",
                 title: "SentEstimates",
               }
            ]
            useEffect(() => {
             prevd()         
              
            }, [EstimateSelected])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="estimatesection">
        <div className="estimatesec">
            {estimatelist.map((e)=>
           <EstimateList key={e.id} 
           id={e.id} 
           title={e.title} 
           active={EstimateSelected===e.id} 
           setEstimateSelected={setEstimateSelected} />)} 
           </div>
    <div className="estimatebody">
    {newEstimateData}
       </div>
    
           </div>
    )
}

export default EstimateSection
