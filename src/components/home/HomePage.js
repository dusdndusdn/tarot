import React from "react";
import TarotButton from "./TarotButton";
import BallImage from "./CrystalBall";
import "./HomePage.css"

function HomePage(){
    return (
        <div className="home-container">

            {/*오늘의 운세 버튼*/}
            <TarotButton text="오늘의 운세" path="/select" />

            {/*수정 구슬*/}
            <BallImage/>
        </div>
    );
}

export default HomePage;