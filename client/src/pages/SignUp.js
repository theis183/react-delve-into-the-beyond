import React, { Component } from "react"
import { Username, Email, Password, ConfirmPassword } from "../compnents/TextBoxes"
import SignUpButton from "../compnents/SignUpButton";
import fetches from "../utils/fetches"
import Wrapper from '../compnents/Wrapper'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpError: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }


        const {
            signUpError,
            signUpUsername,
            Email,
            signUpPassword,
            signUpConfirmPassword,
        } = this.state


        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSignUp = this.onSignUp.bind(this)

    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onSignUp() {
        console.log("Clicked Sign Up")
        fetches.userSignUp(this.state)
            .then(res => {
                const data = res.data
                console.log("Here is the data" + JSON.stringify(data))
                if (data.success) {
                    console.log("Succes")
                    this.props.history.push('/')
                }
            })
    }

    render() {


        return (
            <Wrapper login="false" token="">
                <div className="row">
                    <div className="col-md-12">
                        <Username onChange={this.handleInputChange} />
                        <Email onChange={this.handleInputChange} />
                        <Password onChange={this.handleInputChange} />
                        <ConfirmPassword onChange={this.handleInputChange} />
                        <SignUpButton onClick={this.onSignUp} />
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>Already have an Account?</p>
                        <a href="/">Login Here</a>
                    </div>
                </div>
            </Wrapper>

        )
    }
}


export default SignUp