import React, {useEffect, useState} from "react";
import NumberFormatter from '../model/NumberFormatter';
import lc from "../model/LC";

function BoostComponent({ boost, jugador, activeTab }) {
    const ftm = new NumberFormatter();

    useEffect(() => {
        boost.subscribe(() => {
            if (boost.active) {
                setButton(
                    <button className="kbc-button button" disabled>
                        Active
                    </button>
                )
            }
        });

        jugador.lc.subscribe(() => {
            if (!boost.canBuyBoost()) {
                if (!boost.active) {
                    setButton(
                        <button className="kbc-button button" disabled>
                            Buy: {ftm.formatBigInt(boost.price * 100)} LC
                        </button>
                    )
                }
            } else {
                setButton(
                    <button className="kbc-button button" onClick={onClick}>
                        Buy: {ftm.formatBigInt(boost.price * 100)} LC
                    </button>
                )
            }
        });

        activeTab.subscribe(() => {
            if (boost.active) {
                setButton(
                    <button className="kbc-button button" disabled>
                        Active
                    </button>
                )
            }
        });

    }, []);

    const onClick = () => {
        if (!boost.buyBoost()) {
            setButton(
                <button className="kbc-button button" disabled>
                    Not enough LC
                </button>
            );

            setTimeout(() => {
                setButton(
                    <button className="kbc-button button" onClick={onClick}>
                        Buy: {ftm.formatBigInt(boost.price * 100)} LC
                    </button>
                );
            }, 3000);
        }
    };

    const [button, setButton] = useState(
        <button className="kbc-button button" disabled={!boost.canBuyBoost()} onClick={onClick}>
            Buy: {ftm.formatBigInt(boost.price * 100)} LC
        </button>);

    return (
        <><div className="boost pixel-corners">
            <img className="logosBoost" src={`img/${boost.logo}`} alt="boost Logo"/>
       {/* <><div className="logo-and-title">
            <h2>{boost.id}</h2>
            </div><div className="BoostText">
                    <p>{boost.upgrade.name}</p>
                    <p>Multiplier: {boost.multiplier}x</p></div></>
            <>{button}</>*/}
    </div></> 

    );
}

export default BoostComponent;