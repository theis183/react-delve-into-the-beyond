import React, { Component } from "react"
import { getFromStorage, setInStorage } from "../utils/storage"
import fetches from "../utils/fetches";
import { Redirect } from 'react-router-dom'
import CreateCharacterButton from "../compnents/CreateCharacterButton"
import { CharacterName } from "../compnents/TextBoxes"
import { LoadGameButton } from "../compnents/Buttons"
import Wrapper from "../compnents/Wrapper"
import {CharacterSelectionTable} from "../compnents/Tables"

class CharacterSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            userId: '',
            characterName: '',
            characters: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.createCharacter = this.createCharacter.bind(this)
        this.load = this.load.bind(this)
    }


    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    createCharacter() {
        fetches.createCharacter(this.state)
            .then(window.location.reload())
    }

    load(event) {
        const obj = getFromStorage("Delve_Into_Space")
        const { token, userId } = obj
        const characterId = event.target.value
        console.log("here is the event target " + event.target)
        console.log("Here is the character from the button click " + characterId)
        setInStorage('Delve_Into_Space', {
            token: token,
            userId: userId,
            character: characterId
        })
        this.props.history.push('/Game')
    }

    componentDidMount() {
        const obj = getFromStorage("Delve_Into_Space")
        if (obj && obj.token && obj.userId) {
            const { token, userId } = obj
            fetches.verifyToken(token)
                .then(res => {
                    const data = res.data
                    if (data.success) {
                        this.setState({
                            token: token,
                            userId: userId,
                            isLoading: false
                        })
                        fetches.getUser(userId)
                            .then(res2 => {
                                const userData = res2.data
                                const characters = userData.account.characters
                                if (characters.length !== 0) {
                                    this.setState({
                                        characters: characters
                                    })
                                }
                            })
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
        const {
            isLoading,
            token,
            userId
        } = this.state

        if (isLoading) {
            return (
                <div><p>Loading...</p></div>
            )
        }

        if (!token || !userId) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <Wrapper login="true" token={this.state.token}>
                <div className="row">
                    <div className="col-md-12">
                        <CharacterName onChange={this.handleInputChange} />
                        <CreateCharacterButton onClick={this.createCharacter} />
                        { this.state.characters ?<CharacterSelectionTable load={this.load}>
                            {{
                                characters: this.state.characters
                            }}
                        </CharacterSelectionTable>
                        : <div></div>}
                        
                    </div>
                </div>
                
            </Wrapper>
        )
    }
}

export default CharacterSelect