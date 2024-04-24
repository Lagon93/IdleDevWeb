
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
    canAddSlider = true;

    constructor() {
        this.sliders = [];
    }

     addSlider(upgrade, image) {
        if (!this.canAddSlider) {
            return false;
        }

        const slider = new Slider(upgrade, image);

        if (this.sliders.length > 2) {
            this.sliders.shift();
        }

        this.sliders.push(slider);

        this.notifySubscribers();

        this.canAddSlider = false;
        setTimeout(() => {
            this.canAddSlider = true;
        }, 500);

        return true;
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