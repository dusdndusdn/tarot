import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";

function ResultPage(){
    const location = useLocation();
    const selectedCards = location.state?.selectedCards || [];
    const [showContent, setShowContent] = useState(false);

    const [visibleIndex, setVisibleIndex] = useState(-1);
    const [typingText, setTypingText] = useState(["", "", ""])

    useEffect(() => {
        selectedCards.forEach((_, index) => {
            setTimeout(() => {
                setVisibleIndex(index);
                let text = "interpretation";
                let currentIndex = 0;
                let interval = setInterval(() => {
                    setTypingText((prev) => {
                        let newText = [...prev];
                        newText[index] = text.substring(0, currentIndex + 1);
                        return newText;
                    });
                    currentIndex++;
                    if (currentIndex === text.length) clearInterval(interval);
                }, 50);
            }, index * 2000 + 2000); // ✅ 카드 간격 2초, 빛 애니메이션 후 1.5초 대기
        });
    }, [selectedCards]);

    return (
        <div className="result-container">

            {selectedCards.map((card, index) => (
                <div key={card.id} className={`result-row ${visibleIndex >= index ? "fade-in" : "hidden"}`}>
                    <div className="card-display">
                        <img
                            src={`/card_img/${card.id}.jpg`}
                            alt={`Card ${card.id}`}
                            className={`tarot-card ${card.isUpright ? "upright" : "reversed"}`}
                        />
                    </div>
                    <div className="card-meaning">
                        <p>{typingText[index]}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultPage;