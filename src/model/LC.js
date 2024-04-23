class LC {

    lc;
    lcGeneration;
    lcClick;
    subscribers;

    constructor() {
        this.lc = 0;
        this.lcGeneration = 0;
        this.subscribers = [];
        this.lcClick = 10;
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

    clickLc(){
        this.addLc(this.lcClick);
    }

    setLcGeneration(value){
        this.lcGeneration = value;
        this.notifySubscribers();
    }

    addLcGeneration(amount){
        this.setLcGeneration(this.lcGeneration + amount);
    }

    subtractLcGeneration(amount){
        this.setLcGeneration(this.lcGeneration - amount);
    }

    subscribe(callback){
        this.subscribers.push(callback);
    }

    notifySubscribers(){
        this.subscribers.forEach((callback) => {
            callback();
        });
    }

    rebirth(lvl){
        this.lc = 0;
        this.lcGeneration = 0;
        this.lcClick = 10 * 2 ** lvl;
        this.notifySubscribers();
    }
}

export default LC;