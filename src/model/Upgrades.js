import React from 'react';
import lc from './LC';
import upgradesJson from '../json/upgrades.json';

class Upgrades {
    id = 0;
    lvl = 0;
    interval = 0;
    names = '';
    namesList = [];
    price = 0;
    growth = 0;
    lcGeneration = 0;
    subscribers = [];

    constructor(id, namesList, price, growth, lcGeneration) {
        this.id = id
        this.price = price;
        this.growth = growth;
        this.namesList = namesList;
        this.lcGeneration = lcGeneration;
        this.lvl = 0;
        this.name = namesList[this.lvl];
        this.interval = 1000;
        this.subscribers = [];
    }

    upgradeLvl = () => {
        lc.subtractLc(this.price);
        this.lvl++;
        this.name = this.namesList[this.lvl - 1];

        if (this.lvl === this.namesList.length) {
            this.price = "MAX";
        } else {
            this.price = this.price * Math.pow(this.growth, this.lvl);
            this.lcGeneration = this.lcGeneration * Math.pow(2, this.lvl);
            lc.startAutoGeneration(this.lcGeneration, this.interval);
        }
        this.notifySubscribers()
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
    return new Upgrades(upgrade.id, upgrade.upgrades, upgrade.price, upgrade.growth, upgrade.lcGeneration);
});

export default UpgradesList;

