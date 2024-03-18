import React from 'react';

function Stats({ lc }) {
  return (
    <div className="stats">
      <img src="/lc_icon.png" alt="LC Icon" />
      <p>LC: {lc}</p>
    </div>
  );
}

export default Stats;
