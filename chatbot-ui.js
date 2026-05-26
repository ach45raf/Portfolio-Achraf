// ===== Chatbot UI Controller =====

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotSuggestions = document.getElementById('chatbot-suggestions');

let isOpen = false;

// Ouvrir/Fermer le chatbot
function toggleChatbot() {
    isOpen = !isOpen;
    chatbotWindow.classList.toggle('active');
    
    if (isOpen && chatbotMessages.children.length === 0) {
        // Message de bienvenue
        setTimeout(() => {
            addBotMessage("Bonjour ! 👋 Je suis l'assistant virtuel d'Achraf Arrouf.\n\nJe peux répondre à vos questions sur son profil, ses compétences, ses projets et bien plus encore !\n\nComment puis-je vous aider ?");
            // Ne pas afficher les suggestions automatiquement
        }, 300);
    }
    
    if (isOpen) {
        chatbotInput.focus();
    }
}

chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

// Ajouter un message du bot
function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    // Convertir le markdown simple en HTML
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">${formattedText}</div>
    `;
    
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Ajouter un message de l'utilisateur
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-user"></i></div>
        <div class="message-content">${text}</div>
    `;
    
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Afficher l'indicateur de saisie
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatbotMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Supprimer l'indicateur de saisie
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Afficher les suggestions
function showSuggestions() {
    chatbotSuggestions.innerHTML = '';
    chatbotSuggestions.style.display = 'none'; // Cacher par défaut
}

// Fonction pour afficher/cacher les suggestions
function toggleSuggestions() {
    if (chatbotSuggestions.style.display === 'none' || !chatbotSuggestions.style.display) {
        chatbotSuggestions.style.display = 'flex';
        chatbotSuggestions.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                handleUserInput(suggestion);
                chatbotSuggestions.style.display = 'none';
            });
            chatbotSuggestions.appendChild(chip);
        });
    } else {
        chatbotSuggestions.style.display = 'none';
    }
}

// Gérer l'envoi de message
function handleUserInput(text = null) {
    const userText = text || chatbotInput.value.trim();
    
    if (!userText) return;
    
    // Ajouter le message de l'utilisateur
    addUserMessage(userText);
    
    // Vider l'input
    chatbotInput.value = '';
    
    // Cacher les suggestions
    chatbotSuggestions.style.display = 'none';
    
    // Afficher l'indicateur de saisie
    showTypingIndicator();
    
    // Simuler un délai de réponse (plus réaliste)
    setTimeout(() => {
        removeTypingIndicator();
        
        // Obtenir la réponse du bot
        const response = analyzeQuestion(userText);
        addBotMessage(response);
        
        // Ne pas réafficher les suggestions automatiquement
    }, 800 + Math.random() * 1000); // Délai aléatoire entre 800ms et 1800ms
}

// Événements
chatbotSend.addEventListener('click', () => handleUserInput());

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Désactiver le bouton d'envoi si l'input est vide
chatbotInput.addEventListener('input', () => {
    chatbotSend.disabled = !chatbotInput.value.trim();
});

// Scroll automatique vers le bas
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Animation du bouton chatbot
let pulseInterval;

function startPulseAnimation() {
    let count = 0;
    pulseInterval = setInterval(() => {
        chatbotToggle.style.transform = count % 2 === 0 ? 'scale(1.1)' : 'scale(1)';
        count++;
        
        if (count > 6) {
            clearInterval(pulseInterval);
            chatbotToggle.style.transform = 'scale(1)';
        }
    }, 300);
}

// Démarrer l'animation après 3 secondes
setTimeout(startPulseAnimation, 3000);

// Répéter l'animation toutes les 30 secondes si le chat n'est pas ouvert
setInterval(() => {
    if (!isOpen) {
        startPulseAnimation();
    }
}, 30000);

console.log('🤖 Chatbot initialisé avec succès !');


// Bouton pour afficher/cacher les suggestions
const suggestionsToggle = document.getElementById('suggestions-toggle');
suggestionsToggle.addEventListener('click', toggleSuggestions);
