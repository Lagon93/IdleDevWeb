import lc from './LC';
import upgradesJson from '../json/upgrades.json';

class Upgrades {
    id = 0;
    lvl = 0;
    interval = 0;
    names = '';
    namesList = [];
    price = 0;
    priceGrowth = 0;
    lcGeneration = 0;
    lcGenerationGrowth = 0;
    subscribers = [];

    constructor(id, namesList, price, priceGrowth, lcGeneration, lcGenerationGrowth, interval) {
        this.id = id
        this.price = price;
        this.priceGrowth = priceGrowth;
        this.namesList = namesList;
        this.lcGeneration = lcGeneration;
        this.lcGenerationGrowth = lcGenerationGrowth;
        this.lvl = 0;
        this.name = namesList[this.lvl];
        this.interval = interval;
        this.subscribers = [];
    }

    upgradeLvl = () => {
        lc.subtractLc(this.price);
        this.lvl++;
        this.name = this.namesList[this.lvl - 1];

        if (this.lvl === this.namesList.length) {
            this.price = "MAX";
        } else if (this.lvl === 1) {
            this.price = this.calculatePrice();
            lc.startAutoGeneration(this.lcGeneration, this.interval)
        } else {
            this.price = this.calculatePrice();
            this.lcGeneration = this.calculateLcGeneration();
            lc.startAutoGeneration(this.lcGeneration, this.interval);
        }
        this.notifySubscribers()
    }

    calculatePrice = () => {
        return this.price * this.priceGrowth;
    }

    calculateLcGeneration = () => {
        return this.lcGeneration * this.lcGenerationGrowth;
    }

    handleUpgrade = () => {
        if (lc.lc < this.price) {
            alert('No tienes suficientes LC')
            return;
        }

        if (this.lvl >= this.namesList.length) {
            alert('Ya has mejorado al máximo')
            return;
        }
        this.upgradeLvl();
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

const UpgradesList = upgradesJson.technology.map((upgrade) => {
    return new Upgrades(upgrade.id, upgrade.upgrades, upgrade.price, upgrade.price_growth, upgrade.lcGeneration, upgrade.lc_growth, upgrade.interval);
});

export default UpgradesList;

