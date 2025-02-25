import React from "react";
import "./CrystalBall.css"

function BallImage() {
    return (
        <div className="crystal-container">
            <div className="crystal-glow"></div>
            <div className="crystal-ball">
                <img src="/crystal.png" alt="crystal ball" className="crystal-img"/>
            </div>
        </div>
    );
}

export default BallImage;