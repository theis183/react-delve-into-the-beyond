import React, {Component} from "react"
import './style.css'
import {ArtifactsTable, StationsTable} from "../Tables"
import fetches from "../../utils/fetches";

export function CharacterInformationSection(props){
    return(
    <div id="characterInfoSection" className="sectionBox container">
        <div className='row'>
            <div className='col-md-6'>
                <h3>Character Summary</h3>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-6'>
                <p>Name: {props.name}</p>
            </div>
            <div className = 'col-md-6'>
                <p>Currency: ${props.currency}</p>
            </div>
        </div>
    </div>
    )}

    export class SolarSystemInformationSection extends Component {
        constructor(props) {
            super(props)
    
            this.state = {
                solarSystem: props.children.solarSystem,
                star: '',
                isloading: true
             }
    
    
    
        }
        componentDidMount(){
            fetches.getStar(this.state.solarSystem.star)
            .then(res =>
                {const data = res.data
                    if (data.success){
                        this.setState({
                            star: data.star,
                            isloading: false
                        })
                    }
                
                })
        }
        render(){
            
            if(this.state.isloading){
                return(<div>Loading...</div>)
            }
            const {solarSystem, star} = this.state
            return(
            <div id="solarSysteInfoSection" className="sectionBox container">
                <div className='row'>
                    <div className='col-md-12'>
                        <h3>Solar System Summary</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <p>Distance From Origin: {solarSystem.distanceFromOrigin.toPrecision(5)} LY</p>
                    </div>
                    <div className = 'col-md-6'>
                        <p>System Coordinates: (X:{solarSystem.coord[0].toPrecision(5)}, Y:{solarSystem.coord[1].toPrecision(5)}, Z:{solarSystem.coord[2].toPrecision(5)} ) LY</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <h3>Star Summary</h3>
                    </div>
                </div>    
                <div className="row">
                    <div className='col-md-4'>
                        <p>Star Type: {star.starType}</p>
                    </div>
                    <div className='col-md-4'>
                        <p>Spectral Type: {star.spectralType}</p>
                    </div>
                    <div className='col-md-4'>
                        <p>Luminosity: {star.luminosity.toPrecision(5)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-4'>
                        <p>Mass: {star.mass.toPrecision(5)}</p>
                    </div>
                    <div className='col-md-4'>
                        <p>Temperature: {star.temp.toPrecision(5)}</p>
                    </div>
                </div>    
            </div>
            )
            }    
    }
    export class PlanetInformationSection extends Component {
        constructor(props) {
            super(props)
    
            this.state = {
                planet: props.children.planet,
             }
    
    
    
        }
 
        render(){
            const {planet} = this.state
            return(
            <div id="solarSysteInfoSection" className="sectionBox container">
                <div className='row'>
                    <div className='col-md-12'>
                        <h3>Planet Summary</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <p>Planet Type: {planet.planetType}</p>
                    </div>
                    <div className='col-md-6'>
                        <p>Planet Temp: {planet.planetTemp.toPrecision(5)}</p>
                    </div>                   
                </div>
                <div className='row'>
                    <div className = 'col-md-6'>
                        <p>Distance From Star: {planet.distanceFromStar.toPrecision(5)}</p>
                    </div>
                    <div className = 'col-md-6'>
                        <p>Planet Coordinates: ( X:{planet.coordLoc[0].toPrecision(5)} Y:{planet.coordLoc[1].toPrecision(5)} )</p>
                    </div>
                </div>                    
            </div>
            )
            }    
    }

    export class PlanetSummarySection extends Component {
        constructor(props) {
            super(props)
    
            this.state = {
                planet: props.children.scanResults,
                scanResolution: props.children.scanResolution
             }
    
    
    
        }
    
    
        render(){
            const {planet, scanResolution} = this.state
           return(
           <div>
            {planet.artifacts.length > 0 ? 
            <ArtifactsTable>
                {{
                    artifacts: planet.artifacts,
                    scanResolution: scanResolution
                }}
            </ArtifactsTable> :
            <div>Scan did not Detect any Signs of an Artifact</div> }
            {planet.stations.length > 0 ? 
            <StationsTable>
                {{
                    stations: planet.stations
                    
                }}
            </StationsTable> :
            <div>Scan did not Detect any Signs of an Orbital Station</div> }
            </div>
           )
        
    }
}

export class ShipInformationSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ship: props.children.ship
         }



    }


    render(){
        const {ship} = this.state
       return(
        <div id="shipInfoSection" className="sectionBox container">
        <div className='row'>
            <div className='col-md-12'>
                <h3>Ship Summary</h3>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <p>Name: {ship.shipName}</p>
            </div>
            <div className = 'col-md-4'>
                <p>Role: {ship.role}</p>
            </div>
            <div className = 'col-md-4'>
                <p>Class: {ship.shipClass}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <p>Tech Level: {ship.techLevel}</p>
            </div>
            <div className='col-md-4'>
                <p>Acceleration: {ship.acceleration} m/s</p>
            </div>
            <div className = 'col-md-4'>
                <p>Worm Hole Factor: {ship.wormHoleFactor}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <p>Scan Range: {ship.scanRange} m/s</p>
            </div>
            <div className = 'col-md-4'>
                <p>Scan Resolution: {ship.scanResolution}</p>
            </div>
        </div>
        { ship.miningLasers > 0 ?
        <div className='row'>
            <div className='col-md-4'>
                <p>Mining Lasers: {ship.miningLasers} </p>
            </div>
            <div className = 'col-md-4'>
                <p>Mining Yield: {ship.miningLaserYield} m3/cycle</p>
            </div>
        </div>
        :
        <div className='row'>
            <div className='col-md-4'>
                <p>Mining: No Mining Capabilities</p>
            </div>
        </div>}
    </div>
       )
    
}
}