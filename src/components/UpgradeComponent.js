import React, {useEffect, useState} from "react";
import 'keyboard-css';
import NumberFormatter from '../model/NumberFormatter';


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

  var fmt = new NumberFormatter();

    
    return (
        <div className="upgrade">
            <h2>{upgrade.id}</h2>
            <p>{upgrade.name}</p>
            <p>Price: {fmt.formatBigInt(price*100)}</p>
            <p>Level: {lvl}</p>
            <button className="kbc-button button" onClick={upgrade.handleUpgrade}>Upgrade {nextUpgradeName}</button>
        </div>
    );
}

export default UpgradeComponent;