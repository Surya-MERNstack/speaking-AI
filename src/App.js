import React, { useState, useRef } from 'react';
import './App.css';
import human_speaking from './assets/human.gif'
import non_taking from './assets/non-speaking.png';

const App = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    console.log("clicking -----------")
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  return (
    <div className="app-container">
      <div className="avatar-container">
        {isSpeaking ? (
          <img src={human_speaking} alt="Avatar" className="avatar" />
        ) : (
          <img src={non_taking} alt="Avatar" className="avatar" />
        )}
      </div>

      <div className="input-section">
        <h1>AI Talking Avatar</h1>
        <p className="subtitle">Type something and watch the avatar speak.</p>
        <textarea
          className="text-input"
          rows="4"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="speak-button" onClick={speakText}>
          🎤 Speak
        </button>
      </div>
    </div>
  );
};

export default App;

