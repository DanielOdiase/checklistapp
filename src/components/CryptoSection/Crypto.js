import React,{useState,useEffect} from 'react'
import {ListItem, ListItemText} from "@mui/material";
import "./Crypto.css"
function Crypto() {
    const [crypto, setCrypto] = useState([]);  
    
    const searchCrypto = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/`;
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setCrypto(data.map((cryp=>cryp)))
        }catch(err){
            console.error(err);
        }
    }
    
    useEffect(() => {
       searchCrypto()  
    }, [])
    crypto.splice(10)
    return (
        
             <div>
                 <div className="headings">
                 <p>Name</p>
                 <p>Price</p>
                 <p>24hr-Change</p>
             </div>
        {crypto.map(list=> <div key={list.id}>
        <div className="crypto10">
        <div className="crypto-home">
        
           <img className="cryp-img" src={list.image.small} alt=""/> 
          <ListItem className="crypto-list">
        <ListItemText primary={list.name} secondary={list.symbol} style={{width:'100px'}}/>
        </ListItem>
        </div>
        <div className="crypValue">${list.market_data.current_price.cad}</div>
        <div className="percentChange">
        <p className="cryp-percent">{list.market_data.market_cap_change_percentage_24h}%</p>
        </div>
        </div>
        </div>
        )}
         </div> 
    )
}

export default Crypto
