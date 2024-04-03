import React from 'react';

class LC {
    lc;
    lcGeneration;
    subscribers;

    constructor() {
        this.lc = 0;
        this.lcGeneration = 0;
        this.subscribers = [];
    }

    setLc(value){
        this.lc = value;
        this.notifySubscribers();
    }

    addLc(amount){
        this.setLc(this.lc + amount)
    }

    subtractLc(amount){
        this.setLc(this.lc - amount)
    }

    addLcGeneration = (lc, ms) => {
        this.lcGeneration += lc / (ms / 1000);
        this.notifySubscribers();
    }

    startAutoGeneration = (lcGenerated, interval) => {
        this.addLcGeneration(lcGenerated, interval);
        setInterval(() => {
            this.addLc(lcGenerated);
        }, interval);
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

const lc = new LC();

export default lc;