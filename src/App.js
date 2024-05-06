import React, { useState } from 'react';
import Stats from './components/Stats';
import lc from "./model/LC";
import UpgradesList from "./model/Upgrades";
import UpgradeComponent from "./components/UpgradeComponent";
import './styles.css';
import BoostsList from "./model/Boosts";
import BoostComponent from "./components/BoostComponent";
import SliderComponent from "./components/SliderComponent";

import Jugador from "./model/Jugador";
import ActiveTab from "./model/ActiveTab";

const jugador = new Jugador();
const activeTab = new ActiveTab("Codigos");
const isActive = true;

function App() {
    const [activeTabValue, setActiveTabValue] = useState(activeTab.activeTab);

    const handleProgramHTML = () => {
      jugador.lc.addLc(10);
    }

    const handleTabChange = (tabName) => {
        setActiveTabValue(tabName);
        activeTab.setActiveTab(tabName);
    };

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
              <Stats onProgramHTML={handleProgramHTML} jugador={jugador} />
          </div>
                 {/* Slider de imágenes */

                    <SliderComponent></SliderComponent>

                 }

          <div className="tabs-container">
        <ul className="tabs">
          <li className={activeTabValue === 'Codigos' ? 'active' : ''}onClick={() => handleTabChange("Codigos")}>
          <span>Codigos</span>
          </li>
          <li className={activeTabValue === 'Cursos' ? 'active' : ''}onClick={() => handleTabChange("Cursos")}>
          <span>Cursos</span>
          </li>
        </ul>
          <div className="tab-content">
              <div className={activeTabValue === 'Codigos' ? 'active' : 'hidden'}>
                  {jugador.upgrades.map((upgrade) => (
                      <UpgradeComponent key={upgrade.id} upgrade={upgrade} jugador={jugador} activeTab={activeTab}/>
                  ))}
              </div>
              <div className={`boostsList ${activeTabValue === 'Cursos' && isActive ? 'boostsListActive' : 'hidden'}`}>
                  {jugador.boosts.map((boost) => (
                      <BoostComponent key={boost.id} boost={boost} jugador={jugador} activeTab={activeTab}/>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}


export default App;
