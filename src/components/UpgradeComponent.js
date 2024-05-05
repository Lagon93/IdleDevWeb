import React, {useEffect, useState} from "react";
import 'keyboard-css';
import NumberFormatter from '../model/NumberFormatter';
import lc from "../model/LC";


function UpgradeComponent({ upgrade, jugador, activeTab }) {
    const fmt = new NumberFormatter();
    const [price, setPrice] = useState(fmt.formatBigInt(upgrade.price * 100));
    const [lvl, setLvl] = useState(upgrade.lvl);
    const [nextUpgradeName, setNextUpgradeName] = useState(upgrade.name);
    const [lcGeneration, setLcGeneration] = useState(fmt.formatBigInt(upgrade.lcGenerationTotal * 100));
    const [lcGenerationNext, setLcGenerationNext] = useState(fmt.formatBigInt(upgrade.lcGeneration * 100));
    const [buyMax, setBuyMax] = useState(false);
    const [buyMaxLc, setBuyMaxLc] = useState(fmt.formatBigInt(upgrade.calculateMaxBuy() * 100));

    useEffect(() => {
        upgrade.subscribe(() => {
            setPrice(upgrade.price);
            setLvl(upgrade.lvl);

            setNextUpgradeName(upgrade.namesList[upgrade.lvl]);

            setPrice(fmt.formatBigInt(upgrade.price * 100));
            setLcGeneration(fmt.formatBigInt(upgrade.lcGenerationTotal * 100));
            setLcGenerationNext(fmt.formatBigInt(upgrade.lcGeneration * 100));

            if (upgrade.isMaxLvl()) {
                setButton(
                    <button className="kbc-button button" disabled>
                        MAX
                    </button>
                )
            }
        });

        jugador.lc.subscribe(() => {
            if (!upgrade.canBuyUpgrade()) {
                if (!upgrade.isMaxLvl()) {
                    setButton(
                        <button className="kbc-button button" disabled>
                            Upgrade: {fmt.formatBigInt(upgrade.price * 100)} LC
                        </button>
                    )
                }
            } else {
                setButton(
                    <button className="kbc-button button" onClick={upgrade.handleUpgrade}>
                        Upgrade: {fmt.formatBigInt(upgrade.price * 100)} LC
                    </button>
                )
            }

            setBuyMaxLc(fmt.formatBigInt(upgrade.calculateMaxBuy() * 100));
            setBuyMax(upgrade.calculateMaxBuy() !== 0);
        });

        activeTab.subscribe(() => {
            if (upgrade.isMaxLvl()) {
                setButton(
                    <button className="kbc-button button" disabled>
                        MAX
                    </button>
                )
            }
        });
    }, []);

    const handleMaxBuy = () => {
        if (upgrade.calculateMaxBuy() === 0) {
            return false;
        }

        upgrade.buyMax();
        return true;
    }

    const [button, setButton] = useState(
        <button className="kbc-button button" disabled={!upgrade.canBuyUpgrade()} onClick={upgrade.handleUpgrade}>
            Upgrade: {price} LC
        </button>);

    return (
        <div className="upgrade pixel-corners">
            <div className="UpgradeCaja">
            <div className="logo-and-title">
                <img className="logos" src={`img/${upgrade.logo}`} alt="Code Logo"/>
                <h2>{upgrade.id}</h2>
            </div>
            <div className="UpgradeText">
            <p>{upgrade.name}</p>
            <p>Level: {lvl}</p>
            <p>LC/S Total: {lcGeneration} LC/S </p>
            <p>Upgrade:
            {/*{upgrade.isMaxLvl() ? <p></p> : <p>{nextUpgradeName}</p>}*/}
            {<p>{upgrade.isMaxLvl()} {lcGenerationNext}LC/S</p>}
            </p></div></div>
            <div className="ButtonsUpgrade">{button}
            <button className="kbc-button button" disabled={!buyMax} onClick={handleMaxBuy}>
                Buy Max: {buyMaxLc}
            </button></div>
        </div>
    );
}

export default UpgradeComponent;