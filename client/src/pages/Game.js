import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../utils/storage"
import fetches from "../utils/fetches";
import { Redirect } from 'react-router-dom'
import { LongRangeScanButton, MidRangeScanButton, ShortRangeScanButton } from '../compnents/Buttons'
import { CharacterInformationSection, SolarSystemInformationSection, PlanetSummarySection } from '../compnents/Sections'
import Wrapper from '../compnents/Wrapper'
import { Container } from '../compnents/Container'
import {NearbySolarSystemsTable, NearbyPlanetsTable} from '../compnents/Tables'
import Timer from "../compnents/Timer"


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
            longRangeScanResults: '',
            midRangeScanResults: '',
            shortRangeScanResults: '',
            action: '',
            actionType: '',
            actionCompletionTime: '',
            actionValue: '',
            
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.longRangeScan = this.longRangeScan.bind(this)
        this.midRangeScan = this.midRangeScan.bind(this)
        this.shortRangeScan = this.shortRangeScan.bind(this)
        this.warpTo = this.warpTo.bind(this)
        this.travelTo = this.travelTo.bind(this)
        this.handleActionCompletion = this.handleActionCompletion.bind(this)
        this.resolveTravelTo = this.resolveTravelTo.bind(this)


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
        .then( res => {
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

    warpTo() {
        console.log("function warp to is being worked on")
    }

    travelTo(distance, planetId) {
        const {acceleration, character} = this.state
        const time = Math.sqrt(distance/acceleration) / 30
        fetches.checkAction(character._id)
        .then(res =>
            {
                if (res.data.success && !res.data.found){
                    console.log("In the if success and not having any uncompleted actions")
                    fetches.queueAction(character._id, "Travel", time, planetId)
                    .then(
                        () =>{
                        console.log("Completed the queue of an action")
                        fetches.getActions(character._id).then(
                            actionRes => {
                                const actionData = actionRes.data
                                if(actionData.success && actionData.found){
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

    handleActionCompletion(){
        const {actionType, actionValue} = this.state
        if(actionType==="Travel"){
            this.resolveTravelTo(actionValue)
        }
    }

    resolveTravelTo(planetId){
        fetches.changePlanet(planetId, this.state.character._id)
        .then(res =>{
            const data = res.data
            if(data.success){
                this.setState({
                    action: '',
                    actionType: '',
                    actionCompletionTime: '',
                    actionValue: '',
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
                                        })
                                       fetches.getActions(characterData.character._id)
                                       .then(
                                           actionRes => {
                                               const actionData = actionRes.data
                                               if(actionData.success && actionData.found){
                                                    this.setState({
                                                        action: actionData.action,
                                                        actionType: actionData.action.actionType,
                                                        actionCompletionTime: actionData.action.actionCompletionTime,
                                                        actionValue: actionData.action.actionValue,
                                                        isLoading: false
                                                    }) 
                                               }
                                               else{ this.setState({
                                                   isLoading: false
                                               })} 
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
                    <div className='row'>
                        <div className='col-md-6'>
                            <CharacterInformationSection
                                name={this.state.characterName}
                                currency={this.state.characterCurrency} />
                            <div className='col-md-6'>
                                <SolarSystemInformationSection
                                    distance={this.state.solarSystemDistanceFromOrigin}
                                    coordx={this.state.solarSystemCoord[0]}
                                    coordy={this.state.solarSystemCoord[1]}
                                    coordz={this.state.solarSystemCoord[2]} />
                                <div>acceleration: {this.state.acceleration}</div>
                            </div>
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
                                        "scanResults":this.state.longRangeScanResults,
                                        "currentSolarSystemCoord": this.state.solarSystemCoord}}
                                </NearbySolarSystemsTable> 
                                :  <div></div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            {this.state.midRangeScanResults ? 
                                <NearbyPlanetsTable travel={this.travelTo}>
                                    {{
                                        "scanResults":this.state.midRangeScanResults,
                                        "currentPlanet": this.state.planet}}
                                </NearbyPlanetsTable> 
                                :  <div></div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            {this.state.shortRangeScanResults ? 
                                <PlanetSummarySection>
                                    {{
                                        "scanResults":this.state.shortRangeScanResults,
                                        "scanResolution": this.state.scanResolution
                                        }}
                                </PlanetSummarySection> 
                                :  <div></div>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                        <div>{this.state.actionCompletionTime}</div>
                        <div>{this.state.actionType}</div>
                        <div>{this.state.actionValue}</div>
                        {this.state.action ? 
                        <Timer seconds={(new Date(this.state.actionCompletionTime).getTime() - Date.now()) / 1000.0}
                        handeler={this.handleActionCompletion}>
                        </Timer> :
                        <div></div>
                        }
                            
                        </div>
                    </div>
            </Wrapper>
        )


    }

}

export default Game