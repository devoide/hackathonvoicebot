

document.getElementById('start-btn').addEventListener('click', () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Speech Recognition Setup
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'de-DE'; // Set language to German
        recognition.interimResults = false;
        recognition.maxResults = 1;

        recognition.start();

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            console.log('Ergebnis erhalten: ' + speechResult); // "Result received" in German
            processCommand(speechResult);
        };

        recognition.onerror = function(event) {
            console.error('Fehler bei der Erkennung: ' + event.error); // "Error in recognition" in German
        };

    } else {
        alert('Ihr Browser unterstützt keine Spracherkennung. Bitte verwenden Sie Google Chrome.'); // "Your browser does not support Speech Recognition. Please try Google Chrome." in German
    }
});

function processCommand(command) {
    // Dummy processing for demonstration, adjust as needed
    const responseText = `Du hast gesagt: ${command}`; // "You said" in German

    speak(responseText);
    const parentdiv = document.getElementById("thing");
    const childdiv = document.createElement("div")
    const span = document.createElement("span");
    span.textContent = command
    parentdiv.appendChild(span)
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE'; // Set language to German
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Ihr Browser unterstützt keine Sprachsynthese. Bitte verwenden Sie Google Chrome.'); // "Your browser does not support Speech Synthesis. Please try Google Chrome." in German
    }
}
