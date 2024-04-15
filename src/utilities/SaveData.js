import UpgradesList from "../model/Upgrades";
import BoostsList from "../model/Boosts";
import lc from "../model/LC";

class SaveData {
    lc;
    upgrades;
    boosts;

    constructor(lc, upgrades, boosts) {
        this.lc = lc;
        this.upgrades = upgrades;
        this.boosts = boosts;
    }

    toJSON() {
        return {
            lc: this.lc,
            upgrades: this.upgrades,
            boosts: this.boosts
        };
    }

    static fromJSON(json) {
        return new SaveData(json.lc, json.upgrades, json.boosts);
    }

    static loadJson(json) {
        let data = SaveData.fromJSON(json);

        lc.loadJson(data.lc);
        UpgradesList.forEach((upgrade) => {
            let dataUpgrade = data.upgrades.find((dataUpgrade) => dataUpgrade.id === upgrade.id);
            if (dataUpgrade) {
                upgrade.loadJson(dataUpgrade);
            }
        });

        BoostsList.forEach((boost) => {
            let dataBoost = data.boosts.find((dataBoost) => dataBoost.id === boost.id);
            if (dataBoost) {
                boost.loadJson(dataBoost);
            }
        });

    }
}

function saveCache() {
    const saveData = new SaveData(lc, UpgradesList, BoostsList);
    localStorage.setItem('saveData', JSON.stringify(saveData));

    console.log('Game saved');
}

function loadCache() {
    const saveData = JSON.parse(localStorage.getItem('saveData'));
    if (saveData) {
        SaveData.loadJson(saveData);
        console.log('Game loaded');
    }
}

function saveInFile() {
    const saveData = new SaveData(lc, UpgradesList, BoostsList);
    const blob = new Blob([JSON.stringify(saveData)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'save.json';
    a.click();
    URL.revokeObjectURL(url);
}

function loadFromFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const saveData = JSON.parse(event.target.result);
        SaveData.loadJson(saveData);
        console.log('Game loaded');
    };
    reader.readAsText(file.target.files[0]);
}

export { saveCache, loadCache, saveInFile, loadFromFile };