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
        boost.buyBoost();
    };

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
                    <button className="kbc-button button" onClick={onClick}>
                        Buy: {price} LC
                    </button>
                )
            }
        </div>

    );
}

export default BoostComponent;