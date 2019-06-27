import React from "react"

export function Username(props){
    return(
    <div>
<label for="Username">Username</label>
    <div className="input-group mb-3">
        <input type="text" className="form-control"
         id="Username" aria-describedby="Username"
         name="username"
         {...props}>
         </input>
    </div>
    </div>
    )
}

export function Email(props){
    return(
    <div>
<label for="Email">Email</label>
    <div className="input-group mb-3">
        <input type="email" className="form-control"
         id="Email" aria-describedby="Email"
         name="email"
         {...props}>
         </input>
    </div>
    </div>
    )
}

export function Password(props){
    return(
    <div>
    <label for="Password">Password</label>
    <div className="input-group mb-3">
        <input type="password" className="form-control"
         id="Password" aria-describedby="Password"
         name="password"
         {...props}>
         </input>
    </div>
    </div>
    )
}


export function ConfirmPassword(props){
    return(
    <div>
<label for="ConfirmPassword">Confirm Password</label>
<div className="input-group mb-3">
    <input type="password" className="form-control"
     id="ConfirmPassword" aria-describedby="Confirm Password"
     name="confirmPassword"
     {...props}>
     </input>
</div>
</div>
    )
}