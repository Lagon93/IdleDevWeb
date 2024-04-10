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
          <nav className="navbar">
              <div className="navbar-logo">
                  <img src="img/logoIWD.png" alt="Company Logo"/>
              </div>
              <div className="navbar-menu">
                  <input type="checkbox" id="menu-toggle"/>
                  <label htmlFor="menu-toggle">&#9776;</label>
                  <ul className="menu-items">
                      <li><a href="#">Home</a></li>
                      <li><a href="#">About</a></li>
                      <li><a href="#">Services</a></li>
                      <li><a href="#">Contact</a></li>
                  </ul>
              </div>
          </nav>
          <div className="stats_Column">
              <Stats onProgramHTML={handleProgramHTML} />
              <Button onClick={handleProgramHTML}>Programar web</Button>
          </div>
          <div className="upgradesList">
              {UpgradesList.map((upgrade) => (
                  <UpgradeComponent key={upgrade.id} upgrade={upgrade}/>
              ))}
          </div>
          <div className="boostsList">
              {BoostsList.map((boost) => (
                  <BoostComponent key={boost.id} boost={boost}/>
              ))}
          </div>
      </div>
  );
}

export default App;
