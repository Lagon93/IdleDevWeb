import React, {useEffect, useState} from 'react';
import lc from '../model/LC';

function Stats() {
    const [lcValue, setLcValue] = useState(lc.lc);
    const [lcGeneration, setLcGeneration] = useState(lc.lcGeneration);

    useEffect(() => {
        lc.subscribe(() => {
            setLcValue(lc.lc);
            setLcGeneration(lc.lcGeneration);
        });
    }, []);

  return (
    <div className="stats">
      <p>LC: {lcValue}</p> <img src="img/PJ.png" alt="LC Icon" />
        <p>LC/S: {lcGeneration}</p>
    </div>
  );
}

export default Stats;
