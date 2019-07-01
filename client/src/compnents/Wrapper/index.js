import React from "react"
import './style.css'
import Header from '../Header'
import Footer from '../Footer'

function Wrapper(props){
    return(
        <div className="container-fluid">
            <div className="row">
                <div className= "col align-self-start">
                    <Header />
                </div>
            </div>
            <div className="row">
                <div className= "col">
                {props.children}
                </div>    
            </div>
            <div className="row">
                <div className= "col align-self-end">
                    <Footer />
                </div>
            </div>
        </div>
    )

}

export default Wrapper