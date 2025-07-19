import React, { useState } from 'react';
import Chat from 'Chat';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [entered, setEntered] = useState(false);

  return (
    <div className="App">
      {!entered ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2>Join Chat Room</h2>
          <input placeholder="Your Name" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
          <input placeholder="Room ID" value={room} onChange={(e) => setRoom(e.target.value)} /><br />
          <button onClick={() => username && room && setEntered(true)}>Join</button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
}

export default App;

