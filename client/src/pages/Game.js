import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../utils/storage"
import fetches from "../utils/fetches";
import { Redirect } from 'react-router-dom'
import { LongRangeScanButton, MidRangeScanButton, ShortRangeScanButton } from '../compnents/Buttons'
import { CharacterInformationSection, SolarSystemInformationSection } from '../compnents/Sections'
import Wrapper from '../compnents/Wrapper'
import { Container } from '../compnents/Container'


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
            planet: '',
            ship: '',
            acceleration: '',
            scanRange: '',
            scanResolution: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.longRangeScan = this.longRangeScan.bind(this)
        this.midRangeScan = this.midRangeScan.bind(this)
        this.shortRangeScan = this.shortRangeScan.bind(this)


    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    longRangeScan() {
        console.log("function long range scan is being worked on")
    }

    midRangeScan() {
        console.log("function mid range scan is being worked on")
    }

    shortRangeScan() {
        console.log("function short range scan is being worked on")
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
                                            planet: characterData.character.currentPlanet,
                                            solarSystemDistanceFromOrigin: characterData.character.currentSS.distanceFromOrigin,
                                            solarSystemCoord: characterData.character.currentSS.coord,
                                            ship: characterData.character.shipInst,
                                            acceleration: characterData.character.shipInst.acceleration,
                                            scanRange: characterData.character.shipInst.scanRange,
                                            scanResolution: characterData.character.shipInst.scanResolution,
                                            isLoading: false
                                        })
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
            <Wrapper >
                <Container>
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

                </Container>
            </Wrapper>
        )


    }

}

export default Game