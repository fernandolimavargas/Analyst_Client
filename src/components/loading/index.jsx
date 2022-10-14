import React from "react"
import loadingicon from "../../img/loadingicon.svg"

import "./style.css" 



const Loading = () => { 
    return (
        <div className="loading">
            <img src={loadingicon}/>
        </div>
    )
}; 

export default Loading; 