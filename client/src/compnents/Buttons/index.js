import React from "react"
import "./style.css"

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
        <button type="button" className="btn btn-dark" {...props}><i class="fas fa-satellite-dish"></i>Long Range Scan</button>
        </div>
        ) 
}

export function MidRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}><i class="fas fa-satellite-dish"></i>Mid Range Scan</button>
        </div>
        ) 
}

export function ShortRangeScanButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}><i class="fas fa-satellite-dish"></i>Short Range Scan</button>
        </div>
        ) 
}


export function LogoutButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" id="logoutBtn" {...props}>Logout</button>
        </div>
        ) 
}

export function WarpToSolarSystem(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Warp</button>
        </div>
    )
}

export function TravelToPlanetButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Travel</button>
        </div>
    )
}

export function RetrieveArtifactButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Retrieve</button>
        </div>
    )
}

export function DockButton(props){
    return(
        <div>
        <button type="button" className="btn btn-dark" {...props}>Dock</button>
        </div>
    )
}

export function MainOptionsButton(props){
    return(
        <button type="button" className="btn btn-lg btn-dark btn-block" {...props}>{props.children}</button>        
    )
}

export function GenericButton(props){
    return(
        <button type="button" className="btn btn-dark" {...props}>{props.children}</button>        
    )
}