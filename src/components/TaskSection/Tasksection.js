import React ,{useState,useEffect}from 'react'
import "./TaskSection.css"
function Tasksection() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();  
    
    const [query, setQuery] = useState([]);  
    
    const searchGames = async () => {
        const url = `https://www.balldontlie.io/api/v1/games?start_date=${date}&end_date=${date}`;
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setQuery(data.data.map((item=>item)))
        }catch(err){
            console.error(err);
        }
    }
    
    useEffect(() => {
       searchGames()  
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        
            <div className="card-list">
            <h2 style={{fontSize:'16px'}}>NBA Games {date} </h2>
        {query.map(list=> <div key={list.id}>
        <div className="teams">
        <div className="hometeam">
           <img className="team-img" src={`https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${list.home_team.abbreviation.toLowerCase()}.png`} style={{width:'30px',height:'30px'}} alt=""/> 
        <p className="teamname-home">{list.home_team.full_name}</p>
        <h3 className="score">{list.home_team_score}</h3>
        </div>
        <div className="time">{list.status}</div>
        <div className="awayteam">
        <h3 className="score-v">{list.visitor_team_score}</h3>
           <img className="team-img" src={`https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${list.visitor_team.abbreviation.toLowerCase()}.png`} style={{width:'30px',height:'30px'}} alt=""/> 
        <p className="teamname-away">{list.visitor_team.full_name}</p>
        </div>
        </div>
        </div>
        )}
         </div> 
    
    )
}

export default Tasksection
