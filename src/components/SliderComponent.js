import React, {useEffect, useState} from "react";
import sliderList from "../model/Slider";

function SliderComponent() {
    const [sliderListValue, setSliderListValue] = useState(sliderList.sliders);

    useEffect(() => {
        sliderList.subscribe(() => {
            setSliderListValue([...sliderList.sliders]);
        });
    });

    return (
        <div className="slider">
            {sliderListValue.length > 0 && (
                <div className="slider-container">
                    {sliderListValue.slice().reverse().map((slider, index) => (
                        <div key={slider.id} className={`slider ${index === 0 ? 'new-slider' : ''}`} style={{top: `${index * 50}px`}}>
                            <img src={slider.image}  alt={slider.upgrade} className={"slider-image"} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SliderComponent;