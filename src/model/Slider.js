
class Slider {

    id;
    upgrade;
    image;

    constructor(upgrade, image) {
        this.id = Date.now();
        this.upgrade = upgrade;
        this.image = image;
    }
}

class SliderList {

    sliders = [];
    subscribers = [];

    constructor() {
        this.sliders = [];
    }

     addSlider(upgrade, image) {
        const slider = new Slider(upgrade, image);

        if (this.sliders.length > 2) {
            this.sliders.shift();
        }

        this.sliders.push(slider);

        console.log(this.sliders)

        this.notifySubscribers()
    }

    removeSlider(slider)  {
        this.sliders = this.sliders.filter((s) => s !== slider);

        this.notifySubscribers()
    }

    subscribe(callback){
        this.subscribers.push(callback);
    }

    notifySubscribers(){
        this.subscribers.forEach((callback) => {
            callback();
        });
    }
}

const sliderList = new SliderList();

export default sliderList;