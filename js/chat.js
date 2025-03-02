// =============================================
//  AI Chat Functionality (Now Data Fetching)
// =============================================
async function sendChat() {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return alert('🚀 Please enter a space-related question');

  const chatMessages = document.getElementById('chat-messages');
  const loading = document.getElementById('loading');

  // Add user message
  chatMessages.innerHTML += `<div class="chat-message">👨🚀 <b>You:</b> ${userInput}</div>`;

  loading.style.display = 'block';
  document.getElementById('user-input').value = '';

  try {
    const baseURL = "YOUR_BASE_URL"; // **REPLACE WITH YOUR BASE URL**
    const endpoint = `${baseURL}/environments/production/buckets/your-bucket-id/entries`; // **REPLACE 'your-bucket-id'**

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: await getAuthHeader() // Assumes getAuthHeader() function exists
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    // **Process CCD response here. The following is placeholder:**
    const formattedAnswer = `<pre>CCD Data Response:\n${JSON.stringify(data, null, 2)}</pre>`; // Example formatting
    chatMessages.innerHTML += `
        <div class="chat-message">
            🤖 <b>Data Response:</b> ${formattedAnswer}
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

async function getAuthHeader() {
  // **IMPORTANT:**  Implement your authentication header retrieval logic here.
  // This is a placeholder. You need to define how to get the auth header
  // required for your backend/service.
  // Example placeholder - replace with your actual auth mechanism:
  console.warn("getAuthHeader() is a placeholder! Implement your authentication logic.");
  return { // **Placeholder - Replace!**
    'Authorization': 'Bearer YOUR_AUTH_TOKEN' // **Replace 'YOUR_AUTH_TOKEN'**
  };
}