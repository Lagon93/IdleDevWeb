import React, {useEffect, useState} from 'react';
import lc from '../model/LC';
import NumberFormatter from '../utilities/NumberFormatter';
import Image from "./Image";


function Stats() {
    const fmt = new NumberFormatter();
    const [lcValue, setLcValue] = useState(fmt.formatBigInt(lc.lc*100));
    const [lcGeneration, setLcGeneration] = useState(fmt.formatBigInt(lc.lcGeneration*100));


    useEffect(() => {
        lc.subscribe(() => {
            setLcValue(fmt.formatBigInt(lc.lc*100));
            setLcGeneration(fmt.formatBigInt(lc.lcGeneration*100));
        });
    }, []);


  return (
    <div className="stats">
      <p>LC: {lcValue}</p>
        <Image></Image>
        <p>LC/S: {lcGeneration}</p>
    </div>
  );
}

export default Stats;
