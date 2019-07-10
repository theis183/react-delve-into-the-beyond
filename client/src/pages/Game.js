import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../utils/storage"
import fetches from "../utils/fetches";
import { Redirect } from 'react-router-dom'
import { LongRangeScanButton, MidRangeScanButton, ShortRangeScanButton, MainOptionsButton } from '../compnents/Buttons'
import { CharacterInformationSection, SolarSystemInformationSection, PlanetSummarySection, ShipInformationSection, PlanetInformationSection, InventoryInformationSection } from '../compnents/Sections'
import Wrapper from '../compnents/Wrapper'
import { Container } from '../compnents/Container'
import { NearbySolarSystemsTable, NearbyPlanetsTable } from '../compnents/Tables'
import Timer from "../compnents/Timer"
import Images from "../compnents/Images"


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            character: '',
            characterName: '',
            characterCurrency: '',
            solarSystem: '',
            solarSystemDistanceFromOrigin: '',
            solarSystemCoord: '',
            solarSystemId: '',
            planet: '',
            planetCoord: '',
            planetId: '',
            ship: '',
            acceleration: '',
            scanRange: '',
            scanResolution: '',
            wormHoleFactor: '',
            longRangeScanResults: '',
            midRangeScanResults: '',
            shortRangeScanResults: '',
            action: '',
            actionType: '',
            actionCompletionTime: '',
            actionValue: '',
            screenFocus: '',
            inventory: ''

        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.longRangeScan = this.longRangeScan.bind(this)
        this.midRangeScan = this.midRangeScan.bind(this)
        this.shortRangeScan = this.shortRangeScan.bind(this)
        this.warpTo = this.warpTo.bind(this)
        this.travelTo = this.travelTo.bind(this)
        this.handleActionCompletion = this.handleActionCompletion.bind(this)
        this.resolveTravelTo = this.resolveTravelTo.bind(this)
        this.resolveWarpTo = this.resolveWarpTo.bind(this)
        this.setScreenFocus = this.setScreenFocus.bind(this)
        this.recoverArtifact = this.recoverArtifact.bind(this)


    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    longRangeScan() {
        fetches.longRangeScan(this.state.scanRange, this.state.solarSystemCoord, this.state.solarSystemDistanceFromOrigin)
            .then(
                solarSystems => {
                    this.setState({
                        longRangeScanResults: solarSystems.data
                    })
                    console.log(solarSystems.data)
                }
            )
    }

    midRangeScan() {
        fetches.midRangeScan(this.state.solarSystemId)
            .then(res => {
                this.setState({
                    midRangeScanResults: res.data.solarSystem
                })
            })
    }

    shortRangeScan() {
        fetches.shortRangeScan(this.state.planetId)
            .then(
                res => {
                    console.log("here is the short scan res " + res)
                    this.setState({
                        shortRangeScanResults: res.data.planet
                    })
                }
            )
    }

    warpTo(distance, solarSystemId) {
        console.log("Here is the distance to be traveled in a warp " + distance)
        const { character } = this.state
        const acceleration = parseFloat(this.state.acceleration)
        const wormHoleFactor = parseFloat(this.state.wormHoleFactor)
        console.log("Here is the acceleration " + acceleration)
        console.log("Here is the wormHole factor " + wormHoleFactor)
        const time = Math.sqrt((distance / wormHoleFactor) / acceleration) / 30
        console.log("Here is the time in seconds it should take to complete the warp " + time)
        fetches.checkAction(character._id)
            .then(res => {
                if (res.data.success && !res.data.found) {
                    console.log("In the if success and not having any uncompleted actions")
                    fetches.queueAction(character._id, "Warp", time, solarSystemId)
                        .then(
                            () => {
                                console.log("Completed the queue of an action")
                                fetches.getActions(character._id).then(
                                    actionRes => {
                                        const actionData = actionRes.data
                                        if (actionData.success && actionData.found) {
                                            this.setState({
                                                action: actionData.action,
                                                actionType: actionData.action.actionType,
                                                actionCompletionTime: actionData.action.actionCompletionTime,
                                                actionValue: actionData.action.actionValue
                                            })
                                        }
                                    }
                                )
                            }


                        )
                }
            })
    }

    travelTo(distance, planetId) {
        const { acceleration, character } = this.state
        const time = Math.sqrt(distance / acceleration) / 30
        fetches.checkAction(character._id)
            .then(res => {
                if (res.data.success && !res.data.found) {
                    console.log("In the if success and not having any uncompleted actions")
                    fetches.queueAction(character._id, "Travel", time, planetId)
                        .then(
                            () => {
                                console.log("Completed the queue of an action")
                                fetches.getActions(character._id).then(
                                    actionRes => {
                                        const actionData = actionRes.data
                                        if (actionData.success && actionData.found) {
                                            this.setState({
                                                action: actionData.action,
                                                actionType: actionData.action.actionType,
                                                actionCompletionTime: actionData.action.actionCompletionTime,
                                                actionValue: actionData.action.actionValue
                                            })
                                        }
                                    }
                                )
                            }


                        )
                }
            })
    }

    recoverArtifact(artifact) {
        fetches.addItem("artifact", artifact.techLevel, 1, this.state.inventory._id)
            .then(
                () => {
                    fetches.deleteArtifact(artifact._id)
                        .then(
                            () => {
                                this.shortRangeScan()
                                fetches.getInventory(this.state.ship.inventory)
                                    .then(res => {
                                        const data = res.data
                                        if (data.success) {
                                            this.setState({
                                                inventory: data.inventory,
                                            })
                                        }
                                    })
                            }
                        )
                }
            )
    }

    handleActionCompletion() {
        const { action, actionType, actionValue } = this.state
        if (actionType === "Travel") {
            this.resolveTravelTo(actionValue)
        }
        else if (actionType === "Warp") {
            this.resolveWarpTo(actionValue)
        }
        fetches.completeAction(action._id)
            .then(res => {
                const data = res.data
                if (data.success) {
                    this.setState({
                        action: '',
                        actionType: '',
                        actionCompletionTime: '',
                        actionValue: '',
                    })
                }
            })
    }

    resolveTravelTo(planetId) {
        fetches.changePlanet(planetId, this.state.character._id)
            .then(res => {
                const data = res.data
                if (data.success) {
                    this.setState({
                        midRangeScanResults: '',
                        shortRangeScanResults: '',
                    })
                    fetches.getCharacter(this.state.character._id)
                        .then(characterRes => {
                            const characterData = characterRes.data
                            if (characterData.success) {
                                this.setState({
                                    planet: characterData.character.currentPlanet,
                                    planetCoord: characterData.character.currentPlanet.coordLoc,
                                    planetId: characterData.character.currentPlanet._id,
                                })
                            }
                        })
                }
            })
    }

    resolveWarpTo(solarSystemId) {
        fetches.changeSolarSystem(solarSystemId, this.state.character._id)
            .then(res => {
                const data = res.data
                if (data.success) {
                    this.setState({
                        longRangeScanResults: '',
                        midRangeScanResults: '',
                        shortRangeScanResults: '',
                    })
                    fetches.getCharacter(this.state.character._id)
                        .then(characterRes => {
                            const characterData = characterRes.data
                            if (characterData.success) {
                                this.setState({
                                    solarSystem: characterData.character.currentSS,
                                    solarSystemDistanceFromOrigin: characterData.character.currentSS.distanceFromOrigin,
                                    solarSystemCoord: characterData.character.currentSS.coord,
                                    solarSystemId: characterData.character.currentSS._id,
                                },
                                    () => {
                                        fetches.changePlanet(this.state.solarSystem.planets[0], this.state.character._id)
                                            .then(res => {
                                                const data = res.data
                                                if (data.success) {
                                                    fetches.getCharacter(this.state.character._id)
                                                        .then(characterRes => {
                                                            const characterData = characterRes.data
                                                            if (characterData.success) {
                                                                this.setState({
                                                                    planet: characterData.character.currentPlanet,
                                                                    planetCoord: characterData.character.currentPlanet.coordLoc,
                                                                    planetId: characterData.character.currentPlanet._id,
                                                                })
                                                            }
                                                        })
                                                }

                                            })
                                    }
                                )

                            }
                        })
                }
            })
    }

    setScreenFocus(value) {
        this.setState({
            screenFocus: value
        })
        console.log("Screen set was called")
    }


    componentDidMount() {
        const obj = getFromStorage("Delve_Into_Space")

        if (obj && obj.token) {
            const { token } = obj
            fetches.verifyToken(token)
                .then(res => {
                    const data = res.data
                    if (data.success) {
                        this.setState({
                            token: token,
                        })
                        console.log("validated token")
                        if (obj.character) {
                            const { character } = obj
                            fetches.getCharacter(character)
                                .then(characterRes => {
                                    const characterData = characterRes.data
                                    if (characterData.success) {
                                        console.log("Found Character!")
                                        console.log("Character " + JSON.stringify(characterData.character))
                                        this.setState({
                                            character: characterData.character,
                                            characterCurrency: characterData.character.currency,
                                            characterName: characterData.character.characterName,
                                            solarSystem: characterData.character.currentSS,
                                            solarSystemDistanceFromOrigin: characterData.character.currentSS.distanceFromOrigin,
                                            solarSystemCoord: characterData.character.currentSS.coord,
                                            solarSystemId: characterData.character.currentSS._id,
                                            planet: characterData.character.currentPlanet,
                                            planetCoord: characterData.character.currentPlanet.coordLoc,
                                            planetId: characterData.character.currentPlanet._id,
                                            ship: characterData.character.shipInst,
                                            acceleration: characterData.character.shipInst.acceleration,
                                            scanRange: characterData.character.shipInst.scanRange,
                                            scanResolution: characterData.character.shipInst.scanResolution,
                                            wormHoleFactor: characterData.character.shipInst.wormHoleFactor,
                                        })
                                        fetches.getInventory(this.state.ship.inventory)
                                            .then(res => {
                                                const data = res.data
                                                if (data.success) {
                                                    this.setState({
                                                        inventory: data.inventory,
                                                    })
                                                }
                                                else { console.log("was not able to get inventory") }

                                            })
                                        fetches.getActions(characterData.character._id)
                                            .then(
                                                actionRes => {
                                                    const actionData = actionRes.data
                                                    if (actionData.success && actionData.found) {
                                                        this.setState({
                                                            action: actionData.action,
                                                            actionType: actionData.action.actionType,
                                                            actionCompletionTime: actionData.action.actionCompletionTime,
                                                            actionValue: actionData.action.actionValue,
                                                            isLoading: false
                                                        })
                                                    }
                                                    else {
                                                        this.setState({
                                                            isLoading: false
                                                        })
                                                    }
                                                }
                                            )
                                    }
                                    else {
                                        console.log("Could NOT find Character!")
                                        this.setState({
                                            isLoading: false
                                        })
                                    }
                                })
                        }
                        else {
                            this.setState({
                                isLoading: false
                            })
                        }
                    }
                    else {
                        this.setState({
                            isLoading: false
                        })
                    }

                })
        }
        else {
            this.setState({
                isLoading: false
            })
        }



    }

    render() {
        const { isLoading, token, character } = this.state

        if (isLoading) {
            return (
                <div><p>Loading...</p></div>
            )
        }

        if (!token) {
            return (
                <div>
                    <Redirect to='/' />
                </div>
            )
        }

        if (!character) {
            return (
                <div>
                    <Redirect to='/CharacterSelect' />
                </div>
            )
        }
        //main game return
        return (
            <Wrapper login="true" token={this.state.token}>
                <div className="row">
                    <div div className="col-md-2">
                        <div class="btn-group-vertical">
                            <MainOptionsButton onClick={() => this.setScreenFocus("Character")}>
                            <i class="fas fa-dna"></i><br/>Character</MainOptionsButton>
                            <MainOptionsButton onClick={() => this.setScreenFocus("Ship")}>
                            <i class="fas fa-space-shuttle"></i><br/>Ship</MainOptionsButton>
                            <MainOptionsButton onClick={() => this.setScreenFocus("Inventory")}>
                            <i class="fas fa-box-open"></i><br/>Inventory</MainOptionsButton>
                            <MainOptionsButton onClick={() => this.setScreenFocus("SolarSystem")}>
                            <i class="fas fa-sun"></i><br/>Solar System</MainOptionsButton>
                            <MainOptionsButton onClick={() => this.setScreenFocus("Planet")}>
                            <i class="fas fa-globe"></i><br/>Planet</MainOptionsButton>

                        </div>
                    </div>
                    <div className='col-md-10'>

                        {this.state.screenFocus === "Character" ?
                            <CharacterInformationSection
                                name={this.state.characterName}
                                currency={this.state.characterCurrency} />
                            :
                            <div></div>
                        }

                        {this.state.screenFocus === "Inventory" ?
                            <InventoryInformationSection>
                                {{
                                    ship: this.state.ship
                                }}
                            </InventoryInformationSection>
                            :
                            <div></div>
                        }

                        {this.state.screenFocus === "SolarSystem" ?
                            <SolarSystemInformationSection>
                                {{
                                    solarSystem: this.state.solarSystem
                                }}
                            </SolarSystemInformationSection>
                            : <div></div>}

                        {this.state.screenFocus === "Ship" ?
                            <ShipInformationSection>
                                {{
                                    ship: this.state.ship
                                }}
                            </ShipInformationSection>
                            : <div></div>
                        }

                        {this.state.screenFocus === "Planet" ?
                            <PlanetInformationSection>
                                {{
                                    planet: this.state.planet
                                }}
                            </PlanetInformationSection>
                            : <div></div>
                        }

                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {this.state.action ?
                            <div>
                                <div>Current Action: {this.state.actionType}</div>
                                <Timer seconds={Math.ceil((new Date(this.state.actionCompletionTime).getTime() - Date.now()) / 1000.0)}
                                    handeler={this.handleActionCompletion}>
                                </Timer>
                            </div> :
                            <div></div>
                        }

                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div class="btn-group" role="group">
                            <LongRangeScanButton onClick={this.longRangeScan} />
                            <MidRangeScanButton onClick={this.midRangeScan} />
                            <ShortRangeScanButton onClick={this.shortRangeScan} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {this.state.longRangeScanResults ?
                            <NearbySolarSystemsTable warp={this.warpTo}>
                                {{
                                    "scanResults": this.state.longRangeScanResults,
                                    "currentSolarSystemCoord": this.state.solarSystemCoord
                                }}
                            </NearbySolarSystemsTable>
                            : <div></div>}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {this.state.midRangeScanResults ?
                            <NearbyPlanetsTable travel={this.travelTo}>
                                {{
                                    "scanResults": this.state.midRangeScanResults,
                                    "currentPlanet": this.state.planet
                                }}
                            </NearbyPlanetsTable>
                            : <div></div>}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {this.state.shortRangeScanResults ?
                            <PlanetSummarySection recover={this.recoverArtifact}>
                                {{
                                    "scanResults": this.state.shortRangeScanResults,
                                    "scanResolution": this.state.scanResolution
                                }}
                            </PlanetSummarySection>
                            : <div></div>}
                    </div>
                </div>

            </Wrapper>
        )


    }

}

export default Game