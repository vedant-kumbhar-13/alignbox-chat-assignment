document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const SENDER_NAME = "Vedant"; 

    // --- Mock Data to demonstrate the design ---
    const mockMessages = [
        { message: 'Someone order Bornvita!!', sender: 'Anonymous', type: 'received' },
        { message: 'hahahahah!!', sender: 'Anonymous', type: 'received' },
        { message: 'Hi Guysss 👋', sender: SENDER_NAME, type: 'sent' },
        { message: 'Hello!', sender: 'Anonymous', type: 'received' },
        { message: 'We have Surprise For you!!', sender: 'Abhay Shukla', type: 'received' },
    ];
    // --- End of Mock Data ---

    // Function to append a message to the chat window
    function appendMessage(msg) {
        // Determine if the message is from the current user (sent) or someone else (received)
        const messageType = msg.sender === SENDER_NAME ? 'sent' : 'received';

        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper', messageType);

        // Avatar placeholder
        const avatar = document.createElement('img');
        avatar.src = `https://placehold.co/30x30/E4E6EB/3F3F3F?text=${msg.sender.charAt(0)}`;
        avatar.classList.add('avatar');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        // Sender name
        const senderName = document.createElement('div');
        senderName.classList.add('message-sender');
        senderName.innerText = msg.sender;

        // Message bubble
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message');
        messageBubble.innerText = msg.message;

        // Message metadata (timestamp and checkmark)
        const messageMeta = document.createElement('div');
        messageMeta.classList.add('message-meta');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageMeta.innerHTML = `${time} <i class="fas fa-check-double"></i>`;

        // Assemble the message
        messageContent.appendChild(senderName);
        messageContent.appendChild(messageBubble);
        messageContent.appendChild(messageMeta);
        
        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(messageContent);
        
        chatMessages.appendChild(messageWrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    }

    // Function to handle sending a message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const messageData = {
                message: messageText,
                sender: SENDER_NAME,
            };

            appendMessage(messageData); // Display message immediately

            // Send message to the server
            fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            }).catch(err => console.error('Error sending message:', err));

            messageInput.value = ''; // Clear the input
        }
    }
    
    // Function to load and display chat history
    function loadMessages() {
        fetch('/api/messages')
            .then(response => response.json())
            .then(messages => {
                
                messages.forEach(msg => appendMessage(msg));
            })
            .catch(err => {
                console.error("Could not load messages, using mock data.", err);
                // If fetching fails, load the mock data for demonstration
                mockMessages.forEach(msg => appendMessage(msg));
            });
    }

    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial Load
    loadMessages();
});

