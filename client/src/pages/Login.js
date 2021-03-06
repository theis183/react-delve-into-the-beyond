import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../utils/storage"
import { Username, Password } from "../compnents/TextBoxes"
import SignInButton from "../compnents/SignInButton";
import fetches from "../utils/fetches";
import { Redirect } from 'react-router-dom'
import Wrapper from "../compnents/Wrapper"



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signInUsername: '',
            signInPassword: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSignIn = this.onSignIn.bind(this)


    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onSignIn() {
        fetches.userSignIn(this.state)
            .then(res => {
                const data = res.data
                console.log("Here is the login data" + JSON.stringify(data))
                if (data.success) {
                    setInStorage('Delve_Into_Space', { 
                        token: data.token,
                        userId: data.userId
                     })
                    this.props.history.push('/CharacterSelect')
                }
            }
            )

        console.log("clicked")
    }

    componentDidMount() {
        const obj = getFromStorage("Delve_Into_Space")
        console.log("Here is the get from storage" + obj)

        if (obj && obj.token) {
            const { token } = obj
            console.log("Here is a token " + token)
            fetches.verifyToken(token)
                .then(res => {
                    console.log("Here is a the return call" + res)
                    const data = res.data
                    console.log("Here is data " + JSON.stringify(data))
                    if (data.success) {
                        this.setState({
                            token: token,
                            isLoading: false
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
            token
        } = this.state

        if (isLoading) {
            return (
                <div><p>Loading...</p></div>
            )
        }

        if (!token) {
            return (
                <Wrapper login="false" token="">
                    <div className="row">
                        <div className="col-md-12">
                            <Username onChange={this.handleInputChange} />
                            <Password onChange={this.handleInputChange} />
                            <SignInButton onClick={this.onSignIn} />
                            <br/>
                            <p>Don't have an Account?</p>
                            <a href="/SignUp" >Sign Up Here</a>
                        </div>
                    </div>  
                </Wrapper>
            )
        }
        return (

            <Redirect to='/CharacterSelect' />

        )
    }
}

export default Login