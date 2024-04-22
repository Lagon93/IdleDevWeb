import React, {useEffect, useState} from 'react';
import NumberFormatter from '../model/NumberFormatter';
import Image from "./Image";


function Stats({ jugador }) {
    const fmt = new NumberFormatter();
    const [lcValue, setLcValue] = useState(fmt.formatBigInt(jugador.lc.lc*100));
    const [lcGeneration, setLcGeneration] = useState(fmt.formatBigInt(jugador.lc.lcGeneration*100));
    const [rebirths, setRebirths] = useState(fmt.formatBigInt(jugador.rebirths*100));
    const [rebirthPrice, setRebirthPrice] = useState(fmt.formatBigInt(jugador.getRebirthPrice()*100));
    const [canRebirth, setCanRebirth] = useState(!jugador.getRebithCap());


    useEffect(() => {
        jugador.lc.subscribe(() => {
            setLcValue(fmt.formatBigInt(jugador.lc.lc*100));
            setLcGeneration(fmt.formatBigInt(jugador.lc.lcGeneration*100));
            setRebirths(fmt.formatBigInt(jugador.rebirths*100));
            setRebirthPrice(fmt.formatBigInt(jugador.getRebirthPrice()*100));
            setCanRebirth(!jugador.getRebithCap());
        });
    }, []);


  return (
      <div className="stats">
          <Image jugador={jugador}></Image>
          <p>LC: <p className="numbers">{lcValue}</p></p>
          <p>LC/S: <p className="numbers">{lcGeneration}</p></p>

          <p>Rebirths:{rebirths}</p>
          <button className="kbc-button button" onClick={() => jugador.rebirth()} disabled={canRebirth}>
              Rebirth: {rebirthPrice} LC
          </button>

      </div>
  );
}

export default Stats;
