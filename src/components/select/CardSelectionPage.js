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
        if (selectedCards.includes(id) || selectedCards.length >= 3) return; 

        const newSelectedCards = [...selectedCards, id];
        setSelectedCards(newSelectedCards);

        setCards((prevCards) =>
            prevCards.map((card) =>
                newSelectedCards.includes(card.id)
                    ? { ...card, transform: "scale(1.25) rotate(0deg)" } 
                    : card
            )
        );

        
        if (newSelectedCards.length === 3) {
            setTimeout(() => {
                setShowLightEffect(true); 
                setTimeout(() => navigate("/result"), 1500); 
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
                        className={`card-back ${selectedCards.includes(card.id) ? "selected" : ""}`}
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
