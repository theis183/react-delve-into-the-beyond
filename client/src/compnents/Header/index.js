import React, { Component } from "react";
import './style.css'
import { LogoutButton } from "../Buttons";
import fetches from "../../utils/fetches"
import { Redirect } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: this.props.login,
            token: this.props.token,
            logout: ""
         }

         this.logout = this.logout.bind(this)

    }

    logout(){
        fetches.userLogout(this.state.token)
        .then(this.setState({
            logout: "true"
        }))
    }

render(){
    return(
        <div id="header" className="container-fluid border-bottom border-dark">
            <div className="row">
              <div className="col-md-12">
                <h2>Delve Into The Beyond</h2>
                {this.state.login === "true" ? <LogoutButton onClick={this.logout}> </LogoutButton> : <div></div>}
                {this.state.logout === "true" ? <Redirect to='/' /> : <div></div>}
              </div>
            </div>
        </div>
    )}
}

export default Header