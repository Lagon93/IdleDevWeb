import React, {} from 'react';
import Stats from './components/Stats';
import Button from './components/Button';
import lc from "./model/LC";
import UpgradesList from "./model/Upgrades";
import UpgradeComponent from "./components/UpgradeComponent";
import './styles.css';
import BoostsList from "./model/Boosts";
import BoostComponent from "./components/BoostComponent";

function App() {
    const handleProgramHTML = () => {
      lc.addLc(10);
    }

  return (
    <div className="container">
        <div className="stats_Column">
        <Stats onProgramHTML={handleProgramHTML} />
        <Button onClick={handleProgramHTML}>Programar web</Button>
        </div>
        <div className="upgradesList">
              {UpgradesList.map((upgrade, index) => (
                  <UpgradeComponent key={index} upgrade={upgrade}/>
          ))}
        </div>
        <div className="boostsList">
            {BoostsList.map((boost, index) => (
                <BoostComponent key={index} boost={boost}/>
            ))}
        </div>
    </div>
  );
}

export default App;
