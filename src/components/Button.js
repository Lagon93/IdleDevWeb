import React from 'react';
import 'keyboard-css';

function Button({ onClick, children }) {
  return (
    <button className="kbc-button button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
