import React, {useState, useEffect} from "react";
import "./CardSelectionPage.css"; 

const TOTAL_CARDS = 78;
const ROW_COUNT =3; 

function CardSelectionPage() {

    const[isSpreading, setIsSpreading] = useState(false);
    const[cards, setCards] = useState([]);
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
                    const col = index % CARDS_PER_ROW; // 몇 번째 열인지
                    const row = Math.floor(index / CARDS_PER_ROW); // 몇 번째 줄인지
                    const centerOffset = (CARDS_PER_ROW * 75) / 2; // 중앙 정렬 보정값

                    return {
                        ...card,
                        left: `calc(50% + ${col * 75 - centerOffset}px)`, // ✅ 중앙 기준 배치
                        top: `calc(50% + ${row * 200 - 150}px)`, // ✅ 세로 간격 조정
                        transform: `rotate(${card.rotation}deg)`, // 퍼질 때 회전 적용
                    };
                })
            );
        }, 1500);
    }, []);

    return (
        <div className="selection-container">
            <div className="select-message">Select 3 cards</div>
            <div className="card-container">
            {cards.map((card) => (
                    <img
                        key={card.id}
                        src="/card_back.png"
                        alt="Card Back"
                        className="card-back"
                        style={{
                            left: card.left,
                            top: card.top,
                            transform: card.transform,
                            transition: "left 1s ease-in-out, top 1s ease-in-out, transform 0.3s ease-in-out",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardSelectionPage;