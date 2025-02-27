import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardSelectionPage.css";

const TOTAL_CARDS = 78;
const ROW_COUNT = 3;

function CardSelectionPage() {
    const [isSpreading, setIsSpreading] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]); 
    const [showLightEffect, setShowLightEffect] = useState(false); 
    const navigate = useNavigate(); 
    const CARDS_PER_ROW = TOTAL_CARDS / ROW_COUNT;

    useEffect(() => {
        const initialCards = Array.from({ length: TOTAL_CARDS }, (_, index) => ({
            id: index,
            rotation: Math.floor(Math.random() * 21) - 10,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        }));

        setCards(initialCards);

        setTimeout(() => {
            setIsSpreading(true);
            setCards((prevCards) =>
                prevCards.map((card, index) => {
                    const col = index % CARDS_PER_ROW;
                    const row = Math.floor(index / CARDS_PER_ROW);
                    const centerOffset = (CARDS_PER_ROW * 75) / 2;

                    return {
                        ...card,
                        left: `calc(50% + ${col * 75 - centerOffset}px)`,
                        top: `calc(50% + ${row * 200 - 150}px)`,
                        transform: `rotate(${card.rotation}deg)`,
                    };
                })
            );
        }, 1500);
    }, []);

    //select cards
    const handleCardClick = (id) => {
        if (selectedCards.length >= 3) return; // 중복 선택 방지 & 3장 제한

        // ✅ 70% 확률로 정방향(true), 30% 확률로 역방향(false)
        const isUpright = Math.random() < 0.7;

        const newSelectedCards = [...selectedCards, { id, isUpright }];
        setSelectedCards(newSelectedCards);

        setCards((prevCards) =>
            prevCards.map((card) =>
                newSelectedCards.some((selected) => selected.id === card.id)
                    ? { ...card, transform: "scale(1.25) rotate(0deg)" }
                    : card
            )
        );

        // ✅ 3장이 선택되면 1.5초 후 빛 확산 효과 실행 & ResultPage로 이동
        if (newSelectedCards.length === 3) {
            setTimeout(() => {
                setShowLightEffect(true);
                setTimeout(() => {
                    navigate("/result", { state: { selectedCards: newSelectedCards } }); // ✅ 선택한 카드 정보 전달
                }, 1500);
            }, 1000);
        }
    };

    return (
        <div className="selection-container">
            <div className="select-message">Select 3 cards</div>
            <div className={`card-container ${showLightEffect ? "light-expand" : ""}`}> 
                {cards.map((card) => (
                    <img
                        key={card.id}
                        src="/card_back.png"
                        alt="Card"
                        className={`card-back ${selectedCards.some((selected) => selected.id === card.id) ? "selected" : ""}`}
                        style={{
                            left: card.left,
                            top: card.top,
                            transform: card.transform,
                            transition: "left 1s ease-in-out, top 1s ease-in-out, transform 0.5s ease-in-out",
                        }}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
            {showLightEffect && <div className="light-effect"></div>} 
        </div>
    );
}

export default CardSelectionPage;
