import React, { Component } from "react";

function CreateCharacterButton(props){
return(
<div>
<button type="button" className="btn btn-dark" {...props}>Create Character</button>
</div>
)
}

export default CreateCharacterButton