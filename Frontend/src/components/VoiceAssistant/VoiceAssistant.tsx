// src/VoiceToText.js  
import React, { useState, useEffect, useRef } from 'react';  

const VoiceAssistant = () => {  
  const [transcript, setTranscript] = useState('');  
  const [isListening, setIsListening] = useState(false);  
  const [recognition, setRecognition] = useState(null);  

  const assistant = useRef(null)
  useEffect(() => {  
    // Check for browser support  
    // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;  
    // if (SpeechRecognition) {  
      
    //   const recog = new SpeechRecognition();  
    //   recog.interimResults = true;  
    //   recog.lang = 'en-US';  

    //   recog.onresult = (event) => { 
    //      debugger
    //     const currentTranscript = event.results[event.results.length - 1][0].transcript;  
    //     setTranscript(currentTranscript);  
    //   };  
      

    //   recog.onend = () => {  
    //     // debugger
    //     // if (isListening) {  
    //       recog.start(); // Restart recognition if still listening  
    //     // }  
    //   };  
    //   assistant.current = (recog);  
    // } else {  
    // //   alert('Speech recognition not supported in this browser.');  
    // }  
  }, []);  

  const startListening = () => {  
    if (assistant.current) {  
      setIsListening(true);  
      assistant.current.start();  
    }  
  };  

  const stopListening = () => {  
    if (assistant.current) {  
      setIsListening(false);  
      assistant.current.stop();  
    }  
  };  

  return (  
    <div>  
      <h1>Voice to Text</h1>  
      <button onClick={isListening ? stopListening : startListening}>  
        {isListening ? 'Stop Listening' : 'Start Listening'}  
      </button>  
      <p>{transcript}</p>  
    </div>  
  );  
};  

export default VoiceAssistant;