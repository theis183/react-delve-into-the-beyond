import React, { Component } from "react";
import {NearbySolarSystemsRow, NearbyPlanetRow} from "../Row"


export class NearbySolarSystemsTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            solarSystems: props.children.scanResults,
            currentCoord: props.children.currentSolarSystemCoord
         }



    }


    render(){
        var {currentCoord} = this.state
        var warp = this.props.warp
        var solarSystemsMap = this.state.solarSystems.map(function(solarSystem){
            return <NearbySolarSystemsRow warp={warp}>
                {{
                    "solarSystem": solarSystem,
                    "currentCoord": currentCoord
                }}
            </NearbySolarSystemsRow>;
          })
        
        return(
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Coordinates</th>
          <th scope="col">Distances From Origin</th>
          <th scope="col">Distance From Current Solar System</th>
          <th scope="col">Warp</th>
        </tr>
      </thead>
      <tbody>
          {solarSystemsMap}
      </tbody>
    </table>
        )}
    
}

export class NearbyPlanetsTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            midRangeScanResults: props.children.scanResults,
            currentPlanet: props.children.currentPlanet
         }



    }

    render(){
        var {currentPlanet} = this.state
        var travel = this.props.travel
        var planetsMap = this.state.midRangeScanResults.planets.map(function(planet){
            return <NearbyPlanetRow travel={travel}>
                {{
                    "planet": planet,
                    "currentPlanet": currentPlanet
                }}
            </NearbyPlanetRow>;
          })
        return(
<table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Coordinates</th>
          <th scope="col">Distances From Star</th>
          <th scope="col">Distance From Current Planet</th>
          <th scope="col">Planet Type</th>
          <th scope="col">Travel</th>
        </tr>
      </thead>
      <tbody>
          {planetsMap}
      </tbody>
    </table>
        )
    }

}