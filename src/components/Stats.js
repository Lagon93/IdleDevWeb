import React, {useEffect, useState} from 'react';
import lc from '../model/LC';
import NumberFormatter from '../model/NumberFormatter';


function Stats() {
    const fmt = new NumberFormatter();
    const [lcValue, setLcValue] = useState(fmt.formatBigInt(lc.lc*100));
    const [lcGeneration, setLcGeneration] = useState(fmt.formatBigInt(lc.lcGeneration*100));
    const [clicked, setClicked] = useState(false); // Estado para controlar si se ha hecho clic en la imagen


    useEffect(() => {
        lc.subscribe(() => {
            setLcValue(fmt.formatBigInt(lc.lc*100));
            setLcGeneration(fmt.formatBigInt(lc.lcGeneration*100));
        });
    }, []);

    const handleImageClick = () => {
      setClicked(true);
      lc.addLc(10);
      setTimeout(() => {
        setClicked(false); // Restablecer el estado clicked a false después de un breve retraso
    }, 300); 
  };

  return (
    <div className="stats">
      <p>LC: {lcValue}</p><img 
      src="img/PJ.png"  
      alt="LC Icon" 
      onClick={handleImageClick}
      style={{ filter: clicked ? 'brightness(120%)' : 'brightness(100%)' }}
       />
        <p>LC/S: {lcGeneration}</p>
    </div>
  );
}

export default Stats;
