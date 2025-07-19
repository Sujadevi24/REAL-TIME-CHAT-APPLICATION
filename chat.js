Conversation opened. 1 unread message.

Skip to content
Using Gmail with screen readers
Enable desktop notifications for Gmail.
   OK  No thanks
1 of 816
(no subject)
Inbox

Suja <770sujadevi@gmail.com>
1:15 AM (1 minute ago)
to me

[7/16, 10:46 PM] Ris😘💗: .App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
[7/16, 10:46 PM] Ris😘💗: App.css
[7/16, 10:46 PM] Ris😘💗: import React, { useState } from 'react';
import Chat from './Chat';

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
[7/16, 10:47 PM] Ris😘💗: App.js
[7/16, 10:47 PM] Ris😘💗: import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat({ username, room }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { username, room });

    socket.on('messageHistory', (history) => {
      setChat(history);
    });

    socket.on('receiveMessage', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messageHistory');
    };
  }, [room, username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { user: username, text: message, room });
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div key={i} style={msg.user === username ? styles.myMsg : styles.otherMsg}>
            <strong>{msg.user}</strong>: {msg.text}
            <div style={{ fontSize: '10px', color: '#999' }}>{msg.time}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    background: '#f9f9f9',
  },
  chatBox: {
    height: '400px',
    overflowY: 'auto',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
  },
  inputArea: {
    display: 'flex',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
  },
  button: {
    padding: '10px 20px',
  },
  myMsg: {
    textAlign: 'right',
    background: '#d1ffd6',
    padding: '5px 10px',
    margin: '5px 0',
    borderRadius: '10px',
  },
  otherMsg: {
    textAlign: 'left',
    background: '#fff',
    padding: '5px 10px',
    margin: '5px 0',
    borderRadius: '10px',
  },
};

export default Chat;
[7/16, 10:47 PM] Ris😘💗: Chat.js
[7/16, 10:47 PM] Ris😘💗: body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
t-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
[7/16, 10:48 PM] Ris😘💗: Index.js
