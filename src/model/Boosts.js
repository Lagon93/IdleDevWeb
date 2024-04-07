import lc from "./LC";
import boostsJson from "../json/boosts.json";
import UpgradesList from "./Upgrades";

class Boosts {
    id;
    upgrade;
    multiplier;
    price;
    active;
    subscribers = [];

    constructor(id, upgrade, multiplier, price) {
        this.id = id;
        this.upgrade = upgrade;
        this.multiplier = multiplier;
        this.price = price;
        this.subscribers = [];
    }

    buyBoost = () => {

        if (this.active) {
            return false;
        }

        if (lc.lc < this.price) {
            return false;
        }

        lc.subtractLc(this.price);
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
}

const BoostsList = boostsJson.boosters.map((boost) => {
    let upgrade = UpgradesList.find((upgrade) => upgrade.id === boost.technology);

    console.log(upgrade)
    return new Boosts(boost.id, upgrade, boost.multiplier, boost.price);
});

export default BoostsList;