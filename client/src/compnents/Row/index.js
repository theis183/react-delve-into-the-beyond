import React, { Component } from "react";
import { distance } from "mathjs"
import { WarpToSolarSystem, TravelToPlanetButton, RetrieveArtifactButton, DockButton, GenericButton } from "../Buttons"
import fetches from "../../utils/fetches";

export class NearbySolarSystemsRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            solarSystem: props.children.solarSystem,
            currentCoord: props.children.currentCoord
        }

    }



    render() {
        var warp = this.props.warp
        return (
            <tr>
                <td>X:{this.state.solarSystem.coord[0].toPrecision(5)} Y:{this.state.solarSystem.coord[1].toPrecision(5)} Z:{this.state.solarSystem.coord[2].toPrecision(5)}</td>
                <td>{this.state.solarSystem.distanceFromOrigin.toPrecision(5)}</td>
                <td>{distance(this.state.solarSystem.coord, this.state.currentCoord).toPrecision(5)}</td>
                <td><WarpToSolarSystem value={this.state.solarSystem._id}
                    onClick={() => warp(distance(this.state.solarSystem.coord, this.state.currentCoord) * 149600000000 * 63241, this.state.solarSystem._id)}>
                </WarpToSolarSystem>
                </td>
            </tr>
        )
    }

}

export class NearbyPlanetRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planet: props.children.planet,
            currentPlanetCoordLoc: props.children.currentPlanet.coordLoc
        }


    }
    render() {
        var travel = this.props.travel
        return (
            <tr>
                <td>X:{this.state.planet.coordLoc[0].toPrecision(5)} Y:{this.state.planet.coordLoc[1].toPrecision(5)}</td>
                <td>{this.state.planet.distanceFromStar.toPrecision(5)}</td>
                <td>{distance(this.state.planet.coordLoc, this.state.currentPlanetCoordLoc).toPrecision(5)}</td>
                <td>{this.state.planet.planetType}</td>
                <td><TravelToPlanetButton value={this.state.planet._id} onClick={() => travel(distance(this.state.planet.coordLoc, this.state.currentPlanetCoordLoc) * 149600000000, this.state.planet._id)}></TravelToPlanetButton></td>
            </tr>
        )
    }
}

export class ArtifactRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            artifact: props.children.artifact,
        }


    }
    render() {
        var recover = this.props.recover
        return (
            <tr>
                <td>{this.state.artifact.techLevel}</td>
                <td><RetrieveArtifactButton onClick={() =>{recover(this.state.artifact)}}></RetrieveArtifactButton></td>
            </tr>
        )
    }
}

export class StationRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            station: props.children.station,
        }


    }
    render() {
        const { station } = this.state
        return (
            <tr>
                <td>{station.stationSize}</td>
                <td>{station.manufacturingLvl}</td>
                <td>{station.labLvl}</td>
                <td><DockButton></DockButton></td>
            </tr>
        )
    }
}

export class ItemRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: props.children.item,
        }


    }
    render() {
        const { item } = this.state
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.techLvl}</td>
                <td>{item.volume}</td>
                <td>{item.value}</td>
                <td>{JSON.stringify(item.property)}</td>
                <td>{item.quantity}</td>
                <td><GenericButton>Jettison</GenericButton></td>
            </tr>
        )
    }
}

export class CharacterSelectionRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: props.children.character,
            shipName: '',
            distanceFromOrigin: '',
            isLoading: true
        }


    }

    componentDidMount() {
        fetches.getCharacter(this.state.character._id).then(characterRes => {
            const characterData = characterRes.data
            if (characterData.success) {
                this.setState({
                    distanceFromOrigin: characterData.character.currentSS.distanceFromOrigin,
                    shipName: characterData.character.shipInst.shipName,
                    isLoading: false
                })

            }
        })
    }
    render() {
        if(this.state.isLoading){
            return(
                <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
            </tr> 
            )
        }
        const { character, distanceFromOrigin, shipName } = this.state
        var load = this.props.load
        return (
            <tr>
                <td>{character.characterName}</td>
                <td>$ {character.currency}</td>
                <td>{shipName}</td>
                <td>{distanceFromOrigin.toPrecision(5)} LY</td>
                <td><GenericButton onClick={(event) => load(event)} value={character._id}>Load Game</GenericButton></td>
            </tr>
        )
    }
}