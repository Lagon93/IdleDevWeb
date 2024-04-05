import React, {useEffect, useState} from "react";
import 'keyboard-css';
/* global BigInt */

function UpgradeComponent({ upgrade }) {
    const [price, setPrice] = useState(upgrade.price);
    const [lvl, setLvl] = useState(upgrade.lvl);
    const [nextUpgradeName, setNextUpgradeName] = useState(upgrade.name);

    useEffect(() => {
        upgrade.subscribe(() => {
            setPrice(upgrade.price);
            setLvl(upgrade.lvl);

            if (upgrade.lvl < upgrade.namesList.length) {
                setNextUpgradeName(upgrade.namesList[upgrade.lvl]);
            } else {
                setNextUpgradeName("MAX");
            }
        });
    }, []);
    const CIENTIFICO = 1;
    const INGENIERO = 2;
    const UNIDAD = 3;
    const UNIDADES = {
      '0': '',
      '3': 'k',
      '6': 'm',
      '9': 'b',
      '12': 't',
      '15': 'q',
      '18': 'qi',
      '21': 'sx',
      '24': 'sp',
      '27': 'oc',
      '30': 'no',
      '33': 'dc'
    };
    class NumberFormatter {
      constructor(mode) {
        if(mode && (mode == CIENTIFICO || mode == INGENIERO || mode == UNIDAD)) {
          this.mode = mode;
        } else {
          this.mode = UNIDAD;
        }
      }
      formatBigInt(n) {
        var out = '';
        switch(this.mode) {
          case CIENTIFICO: out = this.formatoCientifico(n);break;
          case INGENIERO: out = this.formatoIngeniero(n);break;
          case UNIDAD: out = this.formatoUnidad(n);break;
        }
        return out;
      }
      formatNumber(n) {
        return this.formatBigInt(BigInt(Math.round(100 * n)));
      }
      formatoCientifico(n) {
        var e = 0;
        while(n >= BigInt(1000)) {
          n /= BigInt(10);
          e++;
        }
        var n2 = Number(n) / 100.0;
        return `${n2.toFixed(2)}${e > 0 ? 'e' + e : ''}`;
      }
      formatoIngeniero(n) {
        var e = 0;
        while(n >= BigInt(100000)) {
          n /= BigInt(1000);
          e+=3;
        }
        var n2 = Number(n) / 100.0;
        return `${n2.toFixed(2)}${e > 0 ? 'e' + e : ''}`;
      }
      formatoUnidad(n) {
        var e = 0;
        while(n >= BigInt(100000)) {
          n /= BigInt(1000);
          e+=3;
        }
        var n2 = Number(n) / 100.0;
        var eStr = `${e}`;
        var out = '';
        if (UNIDADES && UNIDADES[eStr]) {
          out = `${n2.toFixed(2)} ${UNIDADES[eStr]}`;
        } else {
          out = `${n2.toFixed(2)}${e > 0 ? 'e' + e : ''}`;
        }
        return out;
      }
    }
    const formatters = [
      new NumberFormatter(CIENTIFICO),
      new NumberFormatter(INGENIERO),
      new NumberFormatter(UNIDAD)
    ];
    function eventHandler(event) {
      const input = document.getElementById('number');
      const output = document.getElementById('result');
      const number = Number(input.value);
      output.innerHTML = '';
      formatters.forEach((fmt) => {
        output.appendChild(document.createTextNode(`Tipo ${fmt.mode} == ${fmt.formatNumber(number)}`));
        output.appendChild(document.createElement('br'));
      });
    }
    var fmt = new NumberFormatter(INGENIERO);

    
    return (
        <div className="upgrade">
            <h2>{upgrade.id}</h2>
            <p>{upgrade.name}</p>
            <p>Price: {fmt.formatBigInt(price)}</p>
            <p>Level: {lvl}</p>
            <button className="kbc-button button" onClick={upgrade.handleUpgrade}>Upgrade {nextUpgradeName}</button>
        </div>
    );
}

export default UpgradeComponent;