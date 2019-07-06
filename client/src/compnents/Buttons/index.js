import React from "react"
import "./style.css"

export function LoadGameButton(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Load Game</button>
        </div>
        ) 
}

export function LongRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-primary" {...props}>Long Range Scan</button>
        </div>
        ) 
}

export function MidRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-info" {...props}>Mid Range Scan</button>
        </div>
        ) 
}

export function ShortRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-info" {...props}>Short Range Scan</button>
        </div>
        ) 
}


export function LogoutButton(props){
    return(
        <div>
        <button type="button" className="btn" {...props}>Logout</button>
        </div>
        ) 
}

export function WarpToSolarSystem(props){
    return(
        <div>
        <button type="button" className="btn" {...props}>Warp</button>
        </div>
    )
}

export function TravelToPlanetButton(props){
    return(
        <div>
        <button type="button" className="btn" {...props}>Travel</button>
        </div>
    )
}

export function RetrieveArtifactButton(props){
    return(
        <div>
        <button type="button" className="btn" {...props}>Retrieve</button>
        </div>
    )
}

export function DockButton(props){
    return(
        <div>
        <button type="button" className="btn" {...props}>Dock</button>
        </div>
    )
}

export function MainOptionsButton(props){
    return(
        <button type="button" className="btn btn-lg btn-dark btn-block" {...props}>{props.children}</button>        
    )
}