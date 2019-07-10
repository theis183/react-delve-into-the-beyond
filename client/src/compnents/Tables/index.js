import React, { Component } from "react";
import {NearbySolarSystemsRow, NearbyPlanetRow, ArtifactRow, StationRow, ItemRow, CharacterSelectionRow} from "../Row"


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

export class ArtifactsTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            artifacts: props.children.artifacts,
            scanResolution: props.children.scanResolution
         }



    }

    render(){
        var recover = this.props.recover
        var {artifacts, scanResolution} = this.state
        var artifactsMap = artifacts.map(function(artifact){
            if((Math.sqrt(Math.random()) * scanResolution) > artifact.signal){
                return ( <ArtifactRow recover={recover}>
                    {{
                        "artifact": artifact,
                    }}
                </ArtifactRow>
              )
            }
        }) 
            
        return(
<table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">TechLevel</th>
          <th scope="col">Retrieve</th>
        </tr>
      </thead>
      <tbody>
          {artifactsMap}
      </tbody>
    </table>
        )
        }

}

export class StationsTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stations: props.children.stations,
         }



    }

    render(){
        var {stations} = this.state
        var stationsMap = stations.map(function(station){
            return <StationRow>
                {{
                    "station": station
                }}
            </StationRow>;
          })
        return(
<table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Station Size</th>
          <th scope="col">Manufactuaring Level</th>
          <th scope="col">Research Level</th>
          <th scope="col">Dock</th>
        </tr>
      </thead>
      <tbody>
          {stationsMap}
      </tbody>
    </table>
        )
    }

}

export class InventoryTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inventory: props.children.inventory,
         }



    }

    render(){
        var {inventory} = this.state
        var inventoryMap = inventory.items.map(function(item){
            return <ItemRow>
                {{
                    "item": item
                }}
            </ItemRow>;
          })
        return(
<table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">TechLevel</th>
          <th scope="col">Volume/Unit</th>
          <th scope="col">Value/Unit</th>
          <th scope="col">Properties</th>
          <th scope="col">Quantity</th>
          <th scope="col">Jetison</th>
        </tr>
      </thead>
      <tbody>
          {inventoryMap}
      </tbody>
    </table>
        )
    }

}

export class CharacterSelectionTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            characters: props.children.characters,
         }



    }

    render(){
        var {characters} = this.state
        var load = this.props.load
        var characterMap = characters.map(function(character){
            return <CharacterSelectionRow load={load}>
                {{
                    "character": character
                }}
            </CharacterSelectionRow>;
          })
        return(
<table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Character Name</th>
          <th scope="col">Currency</th>
          <th scope="col">Ship</th>
          <th scope="col">Distance From Origin</th>
          <th scope="col">Load Game</th>
        </tr>
      </thead>
      <tbody>
          {characterMap}
      </tbody>
    </table>
        )
    }

}