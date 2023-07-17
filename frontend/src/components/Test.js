import React, { useEffect, useState } from 'react';

function Test() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(response => response.text())
      .then(message => setMessage(message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {message}
      </header>
    </div>
  );
}

export default Test;