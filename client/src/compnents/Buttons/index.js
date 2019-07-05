import React from "react"

export function LoadGameButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Load Game</button>
        </div>
        ) 
}

export function LongRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Long Range Scan</button>
        </div>
        ) 
}

export function MidRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Mid Range Scan</button>
        </div>
        ) 
}

export function ShortRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Short Range Scan</button>
        </div>
        ) 
}


export function LogoutButton(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Logout</button>
        </div>
        ) 
}

export function WarpToSolarSystem(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Warp</button>
        </div>
    )
}

export function TravelToPlanetButton(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Travel</button>
        </div>
    )
}

export function RetrieveArtifactButton(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Retrieve</button>
        </div>
    )
}

export function DockButton(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Dock</button>
        </div>
    )
}