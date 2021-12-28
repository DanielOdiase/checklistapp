import React ,{useState}from 'react'
import ProjectList from '../Projects/ProjectList'
import DashList from '../DashList/DashList'
import "./DashBoardSection.css"



function DashBoardSection({proj,nameValue}) {
    const [loadingStage, setloadingStage] = useState(true)
   
    return (
        <div >
             <div className="greet-container"> 
            {nameValue.map((nm)=>(<h1 className="greeting" key={nm.email}>Hello {nm.name}!</h1>))}
         <p className="Mail">{`You have ${proj.length} tasks today`}</p>
       </div>
        <div className="myfeed">
         <h1 className="feedtext">
           My Feed
         </h1>
         </div>
         <div className="feed-list">
           <DashList proj={proj} loadingStage={loadingStage} setloadingStage={setloadingStage}/>
         </div>
         <div className={loadingStage? "projBody":"projBody active"}>
         {proj.map((projList)=>(<ProjectList key={projList.id} 
                        project= {projList.project} 
                        description={projList.description}
                        inprogress={projList.inprogress} 
                        userId={projList.userId}
                        id={projList.id}
                        />))}
         </div>
        </div>
    )
}

export default DashBoardSection
