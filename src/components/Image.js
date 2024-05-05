import React, { useEffect, useState } from "react";

function Image({ jugador }) {
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [lcClick, setLcClick] = useState(jugador.lc.lcClick);

  useEffect(() => {
    jugador.lc.subscribe(() => {
      setLcClick(jugador.lc.lcClick);
    });
  });

  const handleParticle = (event) => {
    const newParticle = {
      key: Date.now(), // unique key
      x: event.clientX + Math.random() * 100 - 50, // random offset from cursor's x-coordinate
      y: event.clientY + Math.random() * 100 - 50, // random offset from cursor's y-coordinate
      velocityY: -3 - Math.random() * 2, // initial upward velocity with some randomness
    };

    setParticles((prevParticles) => [...prevParticles, newParticle]);

    setTimeout(() => {
      setParticles((prevParticles) =>
        prevParticles.filter((p) => p.key !== newParticle.key)
      );
    }, 1000);
  };

  const handleImageClick = (event) => {
    setClicked(true);
    jugador.lc.clickLc();
    setTimeout(() => {
      setClicked(false);
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
    const timers = particles.map(setTimer);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [particles]);

  useEffect(() => {
    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y + particle.velocityY, // Update y position based on velocity
          velocityY: particle.velocityY + 0.1, // Increase velocity to simulate gravity
        }))
      );
    };

    const intervalId = setInterval(updateParticles, 16); // Update particles approximately every 16ms (60fps)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <img
        src="img/PJ.png"
        alt="LC Icon"
        onClick={handleImageClick}
        draggable={false}
        style={{
          filter: clicked ? "brightness(120%)" : "brightness(100%)",
          userSelect: "none",
        }}
      />

      {particles.map((particle) => (
        <div
          key={particle.key}
          style={{
            position: "absolute",
            top: particle.y,
            left: particle.x,
            color: "black",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          +{lcClick}
        </div>
      ))}
    </>
  );
}

export default Image;
