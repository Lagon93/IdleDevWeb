import React, {useEffect, useState} from "react";
import NumberFormatter from '../model/NumberFormatter';

function BoostComponent({ boost }) {
    const ftm = new NumberFormatter();
    const [price, setPrice] = useState(ftm.formatBigInt(boost.price * 100))
    const [active, setActive] = useState(boost.active);

    useEffect(() => {
        boost.subscribe(() => {;
            setPrice(ftm.formatBigInt(boost.price * 100));
            setActive(boost.active);
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
        <button className="kbc-button button" onClick={onClick}>
            Buy: {ftm.formatBigInt(boost.price * 100)} LC
        </button>
    );

    return (
        <div className="upgrade">
            <h2>{boost.id}</h2>
            <p>{boost.upgrade.name}</p>
            <p>Multiplier: {boost.multiplier}x</p>
            {
                active ? (
                    <button className="kbc-button button" disabled>
                        Active
                    </button>
                ) : (
                    <>
                        {button}
                    </>
                )
            }
        </div>

    );
}

export default BoostComponent;