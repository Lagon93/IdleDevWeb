import lc from "./LC";

class Boosts {
    id;
    logo="";
    upgrade;
    lc;
    multiplier;
    price;
    active;
    subscribers = [];

    baseData;

    constructor(lc, id, logo, upgrade, multiplier, price) {
        this.id = id;
        this.logo= logo
        this.upgrade = upgrade;
        this.lc = lc;
        this.multiplier = multiplier;
        this.price = price;
        this.subscribers = [];
        this.active = false;

        this.baseData = {
            id: id,
            logo: logo,
            upgrade: upgrade,
            multiplier: multiplier,
            price: price,
            active: false
        };
    }

    buyBoost = () => {

        if (this.active) {
            return false;
        }

        if (this.lc.lc < this.price) {
            return false;
        }

        this.lc.subtractLc(this.price);
        this.active = true;

        this.upgrade.activateBoost(this.multiplier);
        this.notifySubscribers();
        return true;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach((callback) => {
            callback();
        });
    }

    canBuyBoost = () => {
        if (this.active) return false;
        return this.lc.lc >= this.price && !this.active;
    }

    rebirth(lvl) {
        this.active = false;
        this.multiplier = this.baseData.multiplier * 2 ** lvl;
        this.price = this.baseData.price * 5 ** lvl;
        this.notifySubscribers();
    }
}

export default Boosts;