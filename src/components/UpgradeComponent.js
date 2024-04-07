import React, {useEffect, useState} from "react";
import 'keyboard-css';
import NumberFormatter from '../model/NumberFormatter';


function UpgradeComponent({ upgrade }) {
    const fmt = new NumberFormatter();
    const [price, setPrice] = useState(fmt.formatBigInt(upgrade.price * 100));
    const [lvl, setLvl] = useState(upgrade.lvl);
    const [nextUpgradeName, setNextUpgradeName] = useState(upgrade.name);
    const [lcGeneration, setLcGeneration] = useState(fmt.formatBigInt(upgrade.lcGenerationTotal * 100));
    const [lcGenerationNext, setLcGenerationNext] = useState(fmt.formatBigInt(upgrade.lcGeneration * 100));

    useEffect(() => {
        upgrade.subscribe(() => {
            setPrice(upgrade.price);
            setLvl(upgrade.lvl);

            setNextUpgradeName(upgrade.namesList[upgrade.lvl]);

            setPrice(fmt.formatBigInt(upgrade.price * 100));
            setLcGeneration(fmt.formatBigInt(upgrade.lcGenerationTotal * 100));
            setLcGenerationNext(fmt.formatBigInt(upgrade.lcGeneration * 100));

            setButton(
                <button className="kbc-button button" onClick={onclickUpgrade}>
                    Upgrade: {fmt.formatBigInt(upgrade.price * 100)} LC
                </button>
            )
        });
    }, []);

    var onclickUpgrade = () => {
        if (!upgrade.handleUpgrade()) {
            setButton(
                <button className="kbc-button button" disabled>
                    Not enough LC
                </button>
            );

            setTimeout(() => {
                setButton(
                    <button className="kbc-button button" onClick={onclickUpgrade}>
                        Upgrade: {fmt.formatBigInt(upgrade.price * 100)} LC
                    </button>
                );
            }, 3000);
        }
    }

    const [button, setButton] = useState(
        <button className="kbc-button button" onClick={onclickUpgrade}>
            Upgrade: {price} LC
        </button>);

    return (
        <div className="upgrade">
            <div className="logo-and-title">
                <img className="logos" src={`img/${upgrade.logo}`} alt="Code Logo"/>
                <h2>{upgrade.id}</h2>
            </div>
            <p>{upgrade.name}</p>
            <p>LC/S Total: {lcGeneration} LC/S </p>
            <p>Level: {lvl}</p>

            <p>Next Upgrade:</p>
            {!upgrade.isMaxLvl() && (
                <div>
                    <p>{nextUpgradeName} +{lcGenerationNext} LC/S</p>
                    {button}
                </div>
            )}
            {upgrade.isMaxLvl() && (
                <button className="kbc-button button" disabled>
                    MAX
                </button>
            )}
        </div>
    );
}

export default UpgradeComponent;