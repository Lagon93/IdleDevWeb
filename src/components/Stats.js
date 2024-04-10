import React, {useEffect, useState} from 'react';
import lc from '../model/LC';
import NumberFormatter from '../model/NumberFormatter';


function Stats() {
    const fmt = new NumberFormatter();
    const [lcValue, setLcValue] = useState(fmt.formatBigInt(lc.lc*100));
    const [lcGeneration, setLcGeneration] = useState(fmt.formatBigInt(lc.lcGeneration*100));
    const [clicked, setClicked] = useState(false); // Estado para controlar si se ha hecho clic en la imagen
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        lc.subscribe(() => {
            setLcValue(fmt.formatBigInt(lc.lc*100));
            setLcGeneration(fmt.formatBigInt(lc.lcGeneration*100));
        });
    }, []);

    const handleImageClick = (event) => {
      setClicked(true);
      lc.clickLc();
      setTimeout(() => {
        setClicked(false); // Restablecer el estado clicked a false después de un breve retraso
        }, 300);

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

    useEffect(() => {
        // Set a timer to remove each particle after 1 second
        const timers = particles.map((particle) =>
            setTimeout(() => {
                setParticles((prevParticles) =>
                    prevParticles.filter((p) => p.key !== particle.key)
                );
            }, 1000)
        );

        // Clear the timers when the component unmounts
        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [particles]);

  return (
    <div className="stats">
      <p>LC: {lcValue}</p><img 
      src="img/PJ.png"  
      alt="LC Icon" 
      onClick={handleImageClick}
      draggable={false}
      style={{
          filter: clicked ? 'brightness(120%)' : 'brightness(100%)',
          userSelect: 'none',
      }}
       />
        <p>LC/S: {lcGeneration}</p>

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
    </div>
  );
}

export default Stats;
