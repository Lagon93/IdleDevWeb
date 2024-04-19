import lc from './LC';
import upgradesJson from '../json/upgrades.json';
import sliderList from "./Slider";

class Upgrades {
    id = 0;
    logo='';
    lvl = 0;
    interval = 0;
    names = '';
    namesList = [];
    price = 0;
    priceGrowth = 0;
    lcGeneration = 0;
    lcGenerationGrowth = 0;
    lcGenerationTotal = 0;
    lcGenerationIntervalValue = 0;
    autoGenerationInterval;
    sliderGenerationInterval;
    slider = "";
    subscribers = [];

    constructor(id, logo, namesList, price, priceGrowth, lcGeneration, lcGenerationGrowth, interval, slider) {
        this.id = id
        this.logo= logo
        this.price = price;
        this.priceGrowth = priceGrowth;
        this.namesList = namesList;
        this.lcGeneration = lcGeneration;
        this.lcGenerationGrowth = lcGenerationGrowth;
        this.lcGenerationTotal = 0;
        this.lvl = 0;
        this.name = namesList[this.lvl];
        this.interval = interval;
        this.subscribers = [];
        this.slider = "/img/sliders/" + slider;
    }

    upgradeLvl = () => {
        lc.subtractLc(this.price);
        this.lvl++;
        this.name = this.namesList[this.lvl - 1];

        this.price = this.calculatePrice();
        this.startAutoGeneration(true)

        this.notifySubscribers()
    }

    isMaxLvl = () => {
        return this.lvl === this.namesList.length;
    }

    calculatePrice = () => {
        return this.price * this.priceGrowth;
    }

    calculateLcGeneration = () => {
        return this.lcGeneration * this.lcGenerationGrowth;
    }

    handleUpgrade = () => {
        if (this.isMaxLvl()) {
            return false;
        }

        if (lc.lc < this.price) {
            return false;
        }

        this.upgradeLvl();
        return true;
    }

    activateBoost(multiplier) {
        this.lcGeneration = this.lcGeneration * multiplier;
        this.lcGenerationTotal = this.lcGenerationTotal * multiplier;
        this.startAutoGeneration(false);
        this.notifySubscribers();
    }

    subscribe(callback){
        this.subscribers.push(callback);
    }

    notifySubscribers(){
        this.subscribers.forEach((callback) => {
            callback();
        });
    }

    startAutoGeneration(addLcGenerate) {
        if(this.autoGenerationInterval){
            clearInterval(this.autoGenerationInterval);
        }

        if (!this.sliderGenerationInterval) {
            this.sliderGenerationInterval = setInterval(() => {
                sliderList.addSlider(this.name, this.slider);
            }, this.interval*2);
        }

        lc.subtractLcGeneration(this.lcGenerationIntervalValue);

        if (addLcGenerate) this.lcGenerationTotal += this.lcGeneration;

        this.autoGenerationInterval = setInterval(() => {
            lc.addLc(this.lcGenerationTotal);
        }, this.interval);

        this.lcGenerationIntervalValue = this.lcGenerationTotal;
        lc.addLcGeneration(this.lcGenerationTotal);

        if (addLcGenerate) this.lcGeneration = this.calculateLcGeneration();
    }

    canBuyUpgrade() {
        if (this.isMaxLvl()) return false;
        return lc.lc >= this.price;
    }
}

const UpgradesList = upgradesJson.technology.map((upgrade) => {
    return new Upgrades(upgrade.id, upgrade.logo, upgrade.upgrades, upgrade.price, upgrade.price_growth, upgrade.lcGeneration, upgrade.lc_growth, upgrade.interval, upgrade.slider);
});

export default UpgradesList;

