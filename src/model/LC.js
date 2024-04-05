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
}

const lc = new LC();

export default lc;