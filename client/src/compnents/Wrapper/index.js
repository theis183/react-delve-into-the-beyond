import React from "react"
import './style.css'
import Header from '../Header'
import Footer from '../Footer'
import {Container, ContainerFluid} from "../Container"

function Wrapper(props){
    return(
        <div id="wrapper">
             <Header login={props.login} token={props.token}/>
            <Container>
                {props.children}
            </Container>
                    <Footer />                 
</div>
    )}

export default Wrapper