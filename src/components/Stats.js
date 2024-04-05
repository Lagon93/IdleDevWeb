import React, {useEffect, useState} from 'react';
import lc from '../model/LC';
import NumberFormatter from '../model/NumberFormatter';


function Stats() {
    const [lcValue, setLcValue] = useState(lc.lc);
    const [lcGeneration, setLcGeneration] = useState(lc.lcGeneration);
    const [clicked, setClicked] = useState(false); // Estado para controlar si se ha hecho clic en la imagen

  
    useEffect(() => {
        lc.subscribe(() => {
            setLcValue(lc.lc);
            setLcGeneration(lc.lcGeneration);
        });
    }, []);

    const handleImageClick = () => {
      setClicked(true);
      lc.addLc(10);
      setTimeout(() => {
        setClicked(false); // Restablecer el estado clicked a false después de un breve retraso
    }, 300); 
  };

  var fmt = new NumberFormatter();
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
