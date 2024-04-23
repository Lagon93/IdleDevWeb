import lc from './LC';

import sliderList from "./Slider";
import LC from "./LC";

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
    maxLvl = 0;

    lc;

    baseData

    constructor(lc, id, logo, namesList, price, priceGrowth, lcGeneration, lcGenerationGrowth, interval, slider) {
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
        this.lc = lc;
        this.maxLvl = namesList.length;

        this.baseData = {
            id: id,
            logo: logo,
            namesList: namesList,
            price: price,
            priceGrowth: priceGrowth,
            lcGeneration: lcGeneration,
            lcGenerationGrowth: lcGenerationGrowth,
            lcGenerationTotal: 0,
            lvl: 0,
            name: namesList[0],
            interval: interval,
            subscribers: [],
            slider: "/img/sliders/" + slider,
            lc: lc,
            maxLvl: namesList.length
        }
    }

    upgradeLvl = () => {
        this.lc.subtractLc(this.price);
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

        if (this.lc.lc < this.price) {
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

        this.lc.subtractLcGeneration(this.lcGenerationIntervalValue);

        if (addLcGenerate) this.lcGenerationTotal += this.lcGeneration;

        this.autoGenerationInterval = setInterval(() => {
            this.lc.addLc(this.lcGenerationTotal);
        }, this.interval);

        this.lcGenerationIntervalValue = this.lcGenerationTotal;
        this.lc.addLcGeneration(this.lcGenerationTotal);

        if (addLcGenerate) this.lcGeneration = this.calculateLcGeneration();
    }

    canBuyUpgrade() {
        if (this.isMaxLvl()) return false;
        return this.lc.lc >= this.price;
    }

    rebirth(lvl) {
        //reset all and multiply the price by 10 and the generation by 2
        this.lvl = 0;
        this.name = this.namesList[this.lvl];
        this.price = this.baseData.price * 5 ** lvl;
        this.lcGeneration = this.baseData.lcGeneration * 2 ** lvl;
        this.lcGenerationTotal = 0;
        this.lcGenerationIntervalValue = 0;
        this.startAutoGeneration(false);
        this.notifySubscribers();
    }

    calculateMaxBuy() {
        // start with the current upgrades until the lvl cap or the lc cap
        let max = 0;
        let lc = this.lc.lc;
        let price = this.price;
        let lvl = this.lvl;
        while (lc >= price && lvl < this.maxLvl) {
            max++;
            lc -= price;
            price = price * this.priceGrowth;
            lvl++;
        }
        return max;
    }

    buyMax() {
        let max = this.calculateMaxBuy();
        for (let i = 0; i < max; i++) {
            this.upgradeLvl();
        }
    }
}



export default Upgrades;

