import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../utils/storage"
import fetches from "../utils/fetches";
import { Redirect } from 'react-router-dom'

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            character: '',
            characterName: '',
            characterCurrency: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)


    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
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
                        if(obj.character){
                            const {character} = obj
                            fetches.getCharacter(character)
                            .then(characterRes => {
                                const characterData = characterRes.data
                                if(characterData.success){
                                    console.log("Found Character!")
                                    this.setState({
                                        character: characterData.character,
                                        characterCurrency: characterData.character.currency,
                                        characterName: characterData.character.characterName,
                                        isLoading: false
                                    })
                                }
                                else{
                                    console.log("Could NOT find Character!")
                                    this.setState({
                                        isLoading: false
                                    })
                                }
                            })
                        }
                        else {this.setState({
                            isLoading:false
                        })}
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

        if (!character){
            return (
                <div>
                    <Redirect to='/CharacterSelect' />
                </div>
            )
        }
//main game return
        return(
            <div>
                Name: {this.state.character.characterName}
                Currency: {this.state.character.currency}$
            </div>
        )


    }

}

export default Game