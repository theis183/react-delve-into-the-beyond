import React from "react"
import "./style.css"

export function Container(props){
    return(
        <div className='container'>
        {props.children}
        </div>
    )
}

export function ContainerFluid(props){
    return(
        <div className='container-fluid'>
        {props.children}
        </div>
    )
}
