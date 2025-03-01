async function sendChat() {
    const apiKey = document.getElementById('api-key').value.trim();
    const userInput = document.getElementById('user-input').value.trim();
    if (!apiKey) return alert('🔑 Please enter your API key');
    if (!userInput) return alert('🚀 Please enter a space-related question');

    const chatMessages = document.getElementById('chat-messages');
    const loading = document.getElementById('loading');
    
    chatMessages.innerHTML += `
        <div class="chat-message">
            👨🚀 <b>You:</b> ${userInput}
        </div>`;
    
    loading.style.display = 'block';
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch(
            `https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `As an astronomy expert, answer concisely in markdown. Use code formatting for equations and technical terms. Question: ${userInput}`
                        }]
                    }],
                    safety_settings: [{
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_ONLY_HIGH"
                    }]
                })
            }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const answer = data.candidates[0].content.parts[0].text;
        const formattedAnswer = answer.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre>$2</pre>');
        
        chatMessages.innerHTML += `
            <div class="chat-message">
                🤖 <b>AI Astronomer:</b> ${formattedAnswer}
            </div>`;
    } catch (error) {
        chatMessages.innerHTML += `
            <div class="chat-message system-message">
                ❌ Error: ${error.message}
            </div>`;
    } finally {
        loading.style.display = 'none';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}