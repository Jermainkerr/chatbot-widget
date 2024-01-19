// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, user: 'user' }]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:3001/message', {
        message: input,
      });

      setMessages([...messages, { text: response.data, user: 'bot' }]);
    } catch (error) {
      console.error('Error communicating with the server:', error.message);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.user}>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
