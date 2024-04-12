document.addEventListener("DOMContentLoaded", load_content);

function load_content() {
    buttonlistener();
}

function buttonlistener() {
    document.addEventListener('keydown', function(event) {
        // Verhindert, dass die Spracherkennung bei jedem Tastendruck neu startet.
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            return;
        }
        let text = "Willkommen bei Ticketcorner."
        speak(text);
        displayCommand(text, "bg-danger")
        text = "Wissen sie welches Konzert sie besuchen möchten?"
        speak(text, startSpeechRecognition);
        displayCommand(text, "bg-danger")
    });
}

function startSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'de-DE';
        recognition.interimResults = false;
        recognition.maxResults = 1;

        recognition.start();

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            console.log('Ergebnis erhalten: ' + speechResult);
            processCommand(speechResult);
        };

        recognition.onerror = function(event) {
            console.error('Fehler bei der Erkennung: ' + event.error);
        };
    } else {
        alert('Ihr Browser unterstützt keine Spracherkennung. Bitte verwenden Sie Google Chrome.');
    }
}

function processCommand(command) {
    const responseText = `Sie haben gesagt: ${command}`;
    speak(responseText)
    displayCommand(command, "bg-primary");
}

function displayCommand(command, color) {
    const containerChat = document.getElementById('container-chat');
    const childdiv = document.createElement("div")
    const span = document.createElement("span");
    span.textContent = command;
    span.classList.add('badge')
    span.classList.add("badge-secondary")
    span.classList.add(color)
    childdiv.appendChild(span);
    containerChat.appendChild(childdiv)
}

function speak(text, callback) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.onend = function() {
            if (callback) {
                callback();
            }
        };
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Ihr Browser unterstützt keine Sprachsynthese. Bitte verwenden Sie Google Chrome.');
    }
}
