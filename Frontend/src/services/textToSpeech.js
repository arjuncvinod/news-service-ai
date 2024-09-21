// Updated textToSpeech function
let currentUtterance = null; // Store the current utterance globally

function textToSpeech(text, onEndCallback) {
  if ('speechSynthesis' in window) {
    // If an utterance is already speaking, cancel it
    if (currentUtterance) {
      window.speechSynthesis.cancel();
    }

    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Optional: Set event listener for when the speech ends
    currentUtterance.onend = () => {
      onEndCallback();
      currentUtterance = null; // Clear the current utterance
    };

    window.speechSynthesis.speak(currentUtterance);
  } else {
    console.error('Text-to-Speech is not supported in this browser.');
  }
}

export default textToSpeech;
