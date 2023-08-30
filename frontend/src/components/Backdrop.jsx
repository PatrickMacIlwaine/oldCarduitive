import React from 'react';
import PropTypes from 'prop-types';

function Backdrop({ onExit }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onExit();
    }
  };

  return (
    <div
      className="backdrop"
      onClick={onExit}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-label="Close or dismiss"
    />
  );
}

Backdrop.propTypes = {
  onExit: PropTypes.func.isRequired,
};

export default Backdrop;
