import React, { useState, useRef } from 'react';
import './App.css';
import human_speaking from './assets/human.gif'
import non_taking from './assets/non-speaking.png';
import SpeakingCharacter from './SpeakingCharacter';

const App = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const intervalRef = useRef(null);

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


// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
// import non_taking from './assets/non-speaking.png';
// import SpeakingCharacter from './SpeakingCharacter';

// const App = () => {
//   const [text, setText] = useState('');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const utteranceRef = useRef(null);

//   // Clean up if the component unmounts
//   useEffect(() => {
//     return () => {
//       try { window.speechSynthesis.cancel(); } catch {}
//       utteranceRef.current = null;
//     };
//   }, []);

//   const resetUI = () => {
//     setIsSpeaking(false);
//     setIsPaused(false);
//     utteranceRef.current = null;
//   };

//   const speakText = () => {
//     if (!text.trim()) return;

//     // Flush any queued/ongoing speech to avoid stale events
//     try { window.speechSynthesis.cancel(); } catch {}

//     const utter = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utter;

//     // Immediate UI feedback
//     setIsSpeaking(true);
//     setIsPaused(false);

//     // Robust event wiring
//     utter.onstart = () => {
//       setIsSpeaking(true);
//       setIsPaused(false);
//     };
//     utter.onpause = () => setIsPaused(true);
//     utter.onresume = () => setIsPaused(false);
//     utter.onend = resetUI;
//     utter.onerror = resetUI;

//     window.speechSynthesis.speak(utter);
//   };

//   const pauseSpeech = () => {
//     // Handle both speaking and queued (pending) states
//     const synth = window.speechSynthesis;
//     if ((synth.speaking || synth.pending) && !synth.paused) {
//       try { synth.pause(); } catch {}
//       // onpause event will set isPaused; this is a fallback:
//       setIsPaused(true);
//     }
//   };

//   const resumeSpeech = () => {
//     const synth = window.speechSynthesis;
//     if (synth.paused) {
//       try { synth.resume(); } catch {}
//       // onresume event will set isPaused; this is a fallback:
//       setIsPaused(false);
//     }
//   };

//   const stopSpeech = () => {
//     try { window.speechSynthesis.cancel(); } catch {}
//     resetUI();
//   };

//   return (
//     <div className="app-container">
//       <div className="avatar-container">
//         {isSpeaking && !isPaused ? (
//           <SpeakingCharacter />
//         ) : (
//           <img src={non_taking} alt="Avatar" className="avatar" />
//         )}
//       </div>

//       <div className="input-section">
//         <h1>AI Talking Avatar</h1>
//         <p className="subtitle">Type something and watch the avatar speak.</p>

//         <textarea
//           className="text-input"
//           rows="4"
//           placeholder="Enter your message..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <div>
//           {!isSpeaking && (
//             <button
//               type="button"
//               className="speak-button"
//               onClick={speakText}
//               disabled={!text.trim()}
//               title={!text.trim() ? 'Type something to speak' : 'Speak'}
//             >
//               🎤 Speak
//             </button>
//           )}

//           {isSpeaking && (
//             <>
//               {!isPaused ? (
//                 <button type="button" className="speak-button" onClick={pauseSpeech}>
//                   ⏸ Pause
//                 </button>
//               ) : (
//                 <button type="button" className="speak-button" onClick={resumeSpeech}>
//                   ▶️ Resume
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="speak-button"
//                 style={{ backgroundColor: '#e63946', marginLeft: 10 }}
//                 onClick={stopSpeech}
//               >
//                 ⏹ Stop
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
