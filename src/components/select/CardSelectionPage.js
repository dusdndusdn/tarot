import React from "react";
import "./CardSelectionPage.css"; // 스타일 파일 추가

const TOTAL_CARDS = 78; // 카드 개수

function CardSelectionPage() {
    return (
        <div className="selection-container">
            <div className="card-container">
                {/* 78장의 카드 뒷면을 생성 */}
                {Array.from({ length: TOTAL_CARDS }, (_, index) => {
                    const randomRotation = Math.floor(Math.random() * 21) - 10; // -10 ~ 10도 회전
                    return (
                        <img 
                            key={index} 
                            src="/card_back.png" 
                            alt="Card Back" 
                            className="card-back"
                            style={{ transform: `rotate(${randomRotation}deg)` }} // ✅ 랜덤 회전 적용
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default CardSelectionPage;
