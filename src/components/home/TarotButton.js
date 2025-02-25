import React from "react";
import { Link } from "react-router-dom";
import "./TarotButton.css"

function TarotButton({text, path}){
    return(
        <Link to={path} className="tarot-button">
                {text}
        </Link>
    );
}

export default TarotButton;