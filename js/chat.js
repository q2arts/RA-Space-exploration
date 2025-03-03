// Chat System
const API_KEY = 'AIzaSyB-qg2CY7gGfowh5ITW5PwljgMMXlNKVHg';
let chatHistory = [];

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an astronomy expert. Answer questions about the solar system. Current question: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;
        addMessage(botResponse, 'bot');
    } catch (error) {
        addMessage("Error connecting to the chat service", 'bot');
    }
}

function addMessage(text, sender) {
    const history = document.getElementById('chat-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = `${sender === 'user' ? 'You: ' : 'RA: '}${text}`;
    history.appendChild(messageDiv);
    history.scrollTop = history.scrollHeight;
}

// Initialize
window.onload = initSolarSystem;
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});