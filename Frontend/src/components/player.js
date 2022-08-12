import React from "react";

export default function Player( { id, name, url } )
{
    const fitme = {
        maxWidth: '400px'
    };

    return (
        <div className = "playerButton">
          <img src = {url} style ={fitme} />
          <div>
            {name}
          </div>
        </div>
      );    
}