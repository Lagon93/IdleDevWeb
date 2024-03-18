import React from 'react';

function Stats({ lc, lcGeneration }) {
  return (
    <div className="stats">
      <img src="/lc_icon.png" alt="LC Icon" />
      <p>LC: {lc}</p>
        <p>LC/S: {lcGeneration}</p>
    </div>
  );
}

export default Stats;
