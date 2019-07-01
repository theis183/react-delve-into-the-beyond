import React from "react"
import './style.css'

export function CharacterInformationSection(props){
    return(
    <div id="characterInfoSection" className="sectionBox container">
        <div className='row'>
            <div className='col-md-6'>
                <h2>{props.name}</h2>
            </div>
            <div className = 'col-md-6'>
                <p>$ {props.currency}</p>
            </div>
        </div>
    </div>
    )}

export function SolarSystemInformationSection(props){
    return(
        <div id="solarSysteInfoSection" className="sectionBox container">
        <div className='row'>
            <div className='col-md-12'>
                <h3>Solar System Summary</h3>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-6'>
                <p>Distance From Origin: {props.distance}</p>
            </div>
            <div className = 'col-md-6'>
                <p>System Coordinates( X:{props.coordx}, Y:{props.coordy}, Z:{props.coordz} )</p>
            </div>
        </div>
    </div>
    )}