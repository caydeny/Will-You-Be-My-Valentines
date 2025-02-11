import React, { useState, useEffect } from 'react';

function Card() {
    const [timeLeft, setTimeLeft] = useState('');
    const [isTimeUp, setIsTimeUp] = useState(false);
    
    const [noButtonStyle, setNoButtonStyle] = useState({
        position: 'absolute',
        right: '0',
        top: '0',
        transform: 'translate(0, 0)',
        transition: '0.15s'
    });

    const [showNewScreen, setShowNewScreen] = useState(false);

    useEffect(() => {
        const countDownDate = new Date("Feb 13, 2025 23:59:59").getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                setTimeLeft("NOW");
                setIsTimeUp(true);
                clearInterval(timer);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

                setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleHover = () => {
        const randomX = Math.floor(Math.random() * 500 - 300);
        const randomY = Math.floor(Math.random() * 400 - 200);
        
        setNoButtonStyle({
            position: 'absolute',
            right: '0',
            top: '0',
            transform: `translate(${randomX}px, ${randomY}px)`,
            transition: '0.15s'
        });
    };

    const handleYesClick = () => {
        setShowNewScreen(true);
    };

    const handleDownload = (e) => {
        if (!isTimeUp) {
            e.preventDefault();
        }
    };

    if (showNewScreen) {
        return (
            <div className="card">
                <img className="card-gif" src="/assets/cat-jump.gif" alt="Jumping cat" />
                <h2 className="card-title">Your gift will unlock in: {timeLeft}</h2>
                <a 
                    href="/assets/cat-jump.gif" 
                    download 
                    className={`card-download ${!isTimeUp ? 'disabled' : ''}`}
                    onClick={handleDownload}
                    style={{
                        opacity: isTimeUp ? 1 : 0.5,
                        cursor: isTimeUp ? 'pointer' : 'not-allowed'
                    }}
                >
                    {isTimeUp ? "Download Your Gift" : "Gift Locked"}
                </a>
            </div>
        );
    }

    return (
        <div className="card">
            <img className="card-gif" src="./src/assets/heart-cat.gif" alt="Heart cat" />
            <h2 className="card-title">Will you be my Valentine?</h2>
            <div className="card-buttons">
                <button onClick={handleYesClick} className="card-yes">Yes</button>
                <button onMouseOver={handleHover} className="card-no" style={noButtonStyle}>No</button>
            </div>
        </div>
    );
}

export default Card;