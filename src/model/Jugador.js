import LC from "./LC";
import upgradesJson from '../json/upgrades.json';
import Upgrades from "./Upgrades";
import Boosts from "./Boosts";
import boostsJson from "../json/boosts.json";


class Jugador {

    name
    lc
    upgrades
    boosts
    rebirths

    constructor() {
        this.lc = new LC();
        this.upgrades = this.setUpgrades();
        this.boosts = this.setBoosts();
        this.rebirths = 0;
    }

    setUpgrades() {
        return upgradesJson.technology.map((upgrade) => {
            return new Upgrades(this.lc, upgrade.id, upgrade.logo, upgrade.upgrades, upgrade.price, upgrade.price_growth, upgrade.lcGeneration, upgrade.lc_growth, upgrade.interval, upgrade.slider);
        });
    }

    setBoosts() {
        return boostsJson.boosters.map((boost) => {
            // get the upgrade that the boost is related to
            let upgrade = this.upgrades.find((upgrade) => upgrade.id === boost.technology);
            return new Boosts(this.lc, boost.id, upgrade, boost.multiplier, boost.price);
        });
    }

    getRebithCap() {
        // rebirth need all upgrades to be max level and all boosts to be active + 1m LC, 10 more for each rebirth, if this all true, return true
        return this.upgrades.every((upgrade) => upgrade.isMaxLvl()) && this.boosts.every((boost) => boost.active) && this.lc.lc >= this.getRebirthPrice();
    }

    getRebirthPrice() {
        return 10000 * ((this.rebirths + 1) * 10);
    }

    rebirth() {
        this.rebirths++;
        this.lc.rebirth(this.rebirths);
        this.upgrades.forEach((upgrade) => {
            upgrade.rebirth(this.rebirths);
        });
        this.boosts.forEach((boost) => {
            boost.rebirth(this.rebirths);
        });
    }
}

export default Jugador;