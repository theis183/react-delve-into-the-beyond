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