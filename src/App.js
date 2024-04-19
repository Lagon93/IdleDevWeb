import React, { useState } from 'react';
import Stats from './components/Stats';
import lc from "./model/LC";
import UpgradesList from "./model/Upgrades";
import UpgradeComponent from "./components/UpgradeComponent";
import './styles.css';
import BoostsList from "./model/Boosts";
import BoostComponent from "./components/BoostComponent";
import SliderComponent from "./components/SliderComponent";


function App() {
    const [activeTab, setActiveTab] = useState('Codigos');

    const handleProgramHTML = () => {
      lc.addLc(10);
    }
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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
              <Stats onProgramHTML={handleProgramHTML} />
          </div>
                 {/* Slider de imágenes */}
          <SliderComponent />

          <div className="tabs-container">
        <ul className="tabs">
          <li className={activeTab === 'Codigos' ? 'active' : ''}>
          <span onClick={() => handleTabChange('Codigos')}>Codigos</span>
          </li>
          <li><span>/</span></li>
          <li className={activeTab === 'Cursos' ? 'active' : ''}>
          <span onClick={() => handleTabChange('Cursos')}>Cursos</span>
          </li>
        </ul>
        <div className="tab-content">
          {activeTab === 'Codigos' && (
            <div className="upgradesList">
              {UpgradesList.map((upgrade) => (
                <UpgradeComponent key={upgrade.id} upgrade={upgrade} />
              ))}
            </div>
          )}
          {activeTab === 'Cursos' && (
            <div className="boostsList">
              {BoostsList.map((boost) => (
                <BoostComponent key={boost.id} boost={boost} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default App;
