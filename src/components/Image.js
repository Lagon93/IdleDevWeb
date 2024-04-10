import React, {useEffect, useState} from "react";
import lc from "../model/LC";

function Image({ src, alt, onClick }) {
    const [clicked, setClicked] = useState(false); // Estado para controlar si se ha hecho clic en la imagen
    const [particles, setParticles] = useState([]);

    const handleParticle = (event) => {
        const newParticle = {
            key: Date.now(), // unique key
            x: event.clientX + Math.random() * 100 - 50, // random offset from cursor's x-coordinate
            y: event.clientY + Math.random() * 100 - 50, // random offset from cursor's y-coordinate
        };

        // Add the new particle to the particles array
        setParticles((prevParticles) => [...prevParticles, newParticle]);

        setTimeout(() => {
            setParticles((prevParticles) =>
                prevParticles.filter((p) => p.key !== newParticle.key)
            );
        }, 1000);
    };

    const handleImageClick = (event) => {
        setClicked(true);
        lc.clickLc();
        setTimeout(() => {
            setClicked(false); // Restablecer el estado clicked a false después de un breve retraso
        }, 300);

        handleParticle(event);
    };

    const removeParticle = (particle) => {
        setParticles((prevParticles) =>
            prevParticles.filter((p) => p.key !== particle.key)
        );
    };

    const setTimer = (particle) => {
        return setTimeout(() => removeParticle(particle), 1000);
    };

    useEffect(() => {
        // Set a timer to remove each particle after 1 second
        const timers = particles.map(setTimer);

        // Clear the timers when the component unmounts
        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [particles]);

    return (
        <>
        <img
            src="img/PJ.png"
            alt="LC Icon"
            onClick={handleImageClick}
            draggable={false}
            style={{
                filter: clicked ? 'brightness(120%)' : 'brightness(100%)',
                userSelect: 'none',
            }}
        />

            {particles.map((particle) => (
                <div
                    key={particle.key}
                    style={{
                        position: 'absolute',
                        top: particle.y,
                        left: particle.x,
                        color: 'black',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                >
                    +10
                </div>
            ))}
        </>

    );
}

export default Image;