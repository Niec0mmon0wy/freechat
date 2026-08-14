const socket = io();

const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');

const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

let username = '';

// When user submits their name
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (usernameInput.value.trim()) {
    username = usernameInput.value.trim();
    
    // Hide login screen and show chat container
    loginContainer.style.display = 'none';
    chatContainer.style.display = 'flex';
    messageInput.focus();
  }
});

// Send message with username attached
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value.trim()) {
    const messageData = {
      user: username,
      text: messageInput.value
    };
    socket.emit('chat message', messageData);
    messageInput.value = '';
  }
});

// Listen for incoming messages from server
socket.on('chat message', (data) => {
  const item = document.createElement('li');
  
  // Create a span for the username
  const nameSpan = document.createElement('span');
  nameSpan.textContent = `${data.user}:`;
  
  item.appendChild(nameSpan);
  item.append(` ${data.text}`);
  
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});