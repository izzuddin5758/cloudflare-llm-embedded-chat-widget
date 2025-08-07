/**
 * AI Assistant - Embeddable Chat Widget
 * Based on Cloudflare LLM Chat App Template
 * 
 * This script creates a floating chat bubble that expands into a chat window
 * when clicked, providing AI assistance.
 */

(function() {
  // Configuration options with defaults - Users only need to configure these once
  const config = {
    chatEndpoint: window.CHAT_ENDPOINT || '/api/chat',
    position: window.CHAT_POSITION || 'right', // 'right' or 'left'
    primaryColor: window.CHAT_PRIMARY_COLOR || '#007bff',
    secondaryColor: window.CHAT_SECONDARY_COLOR || '#0056b3',
    welcomeMessage: window.CHAT_WELCOME_MESSAGE || 'Hello! I\'m your AI assistant. How can I help you today?',
    disclaimerMessage: window.CHAT_DISCLAIMER_MESSAGE || 'Disclaimer: This AI chatbot provides general information and may not always be accurate or up to date. It\'s not a substitute for professional advice. Use at your own discretion.',
    chatTitle: window.CHAT_TITLE || 'AI Assistant',
    profileImageUrl: window.CHAT_PROFILE_IMAGE_URL || 'https://via.placeholder.com/60x60/f1f3f4/5f6368?text=AI',
    bubbleIcon: window.CHAT_BUBBLE_ICON || '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM2.3806 15.9134L3.07351 15.6264V15.6264L2.3806 15.9134ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM2.75 11.5V10.5H1.25V11.5H2.75ZM1.25 11.5C1.25 12.6546 1.24959 13.5581 1.29931 14.2868C1.3495 15.0223 1.45323 15.6344 1.68769 16.2004L3.07351 15.6264C2.92737 15.2736 2.84081 14.8438 2.79584 14.1847C2.75041 13.5189 2.75 12.6751 2.75 11.5H1.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z" fill="currentColor"/><path d="M10.9901 14.3082L11.435 13.7045H11.435L10.9901 14.3082ZM12 8.10615L11.4641 8.63086C11.6052 8.77495 11.7983 8.85615 12 8.85615C12.2017 8.85615 12.3948 8.77495 12.5359 8.63086L12 8.10615ZM13.0099 14.3082L12.565 13.7045L12.565 13.7045L13.0099 14.3082ZM12 14.8103L12 14.0603H12L12 14.8103ZM11.435 13.7045C10.7914 13.2302 9.96746 12.5568 9.31176 11.808C8.63279 11.0325 8.25 10.3064 8.25 9.71476H6.75C6.75 10.8757 7.44886 11.9574 8.18323 12.7961C8.94088 13.6614 9.86191 14.4085 10.5451 14.912L11.435 13.7045ZM8.25 9.71476C8.25 8.60703 8.74454 8.02373 9.25333 7.83348C9.77052 7.6401 10.5951 7.74331 11.4641 8.63086L12.5359 7.58145C11.38 6.40091 9.95456 5.96985 8.72797 6.42849C7.49299 6.89028 6.75 8.14533 6.75 9.71476H8.25ZM13.4549 14.912C14.1381 14.4085 15.0591 13.6614 15.8168 12.7961C16.5511 11.9574 17.25 10.8758 17.25 9.71475H15.75C15.75 10.3064 15.3672 11.0326 14.6882 11.808C14.0325 12.5568 13.2086 13.2302 12.565 13.7045L13.4549 14.912ZM17.25 9.71475C17.25 8.14532 16.507 6.89027 15.272 6.42849C14.0454 5.96985 12.62 6.40091 11.4641 7.58145L12.5359 8.63086C13.4049 7.74331 14.2295 7.6401 14.7467 7.83348C15.2555 8.02373 15.75 8.60702 15.75 9.71475H17.25ZM10.5451 14.912C10.9368 15.2007 11.3752 15.5603 12 15.5603L12 14.0603C11.9852 14.0603 11.9682 14.0626 11.899 14.0252C11.8008 13.972 11.678 13.8836 11.435 13.7045L10.5451 14.912ZM12.565 13.7045C12.322 13.8836 12.1992 13.972 12.101 14.0252C12.0318 14.0626 12.0148 14.0603 12 14.0603L12 15.5603C12.6248 15.5603 13.0632 15.2007 13.4549 14.912L12.565 13.7045Z" fill="currentColor"/></svg>',
    closeIcon: window.CHAT_CLOSE_ICON || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    sendIcon: window.CHAT_SEND_ICON || '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
    locale: window.CHAT_LOCALE || 'en-US',
    timezone: window.CHAT_TIMEZONE || Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  // Create and inject CSS
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-chat-widget-container * {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      
      .ai-chat-bubble {
        position: fixed;
        bottom: 20px;
        ${config.position}: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .ai-chat-bubble:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      
      .ai-chat-window {
        position: fixed;
        bottom: 90px;
        ${config.position}: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        overflow: visible;
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        pointer-events: none;
      }
      
      .ai-chat-window.active {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }
      
      .ai-chat-header {
        padding: 15px 20px;
        background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: visible;
      }
      
      .ai-chat-profile-photo {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border: none;
        position: absolute;
        bottom: 0px;
        left: 20px;
        z-index: 10;
        border-radius: 50%;
      }
      
      .ai-chat-header h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        margin-left: 65px;
        z-index: 11;
        position: relative;
      }
      
      .ai-chat-close {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }
      
      .ai-chat-messages {
        flex: 1;
        padding: 40px 20px 20px 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .ai-message {
        display: flex;
        align-items: flex-start;
        max-width: 80%;
        animation: slideIn 0.3s ease;
      }
      
      .ai-message.user {
        align-self: flex-end;
        flex-direction: row-reverse;
      }
      
      .ai-message-bubble {
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .ai-message.assistant .ai-message-bubble {
        background: #f1f3f4;
        color: #333;
        border-top-left-radius: 4px;
      }
      
      .ai-message.user .ai-message-bubble {
        background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%);
        color: white;
        border-top-right-radius: 4px;
      }
      
      .ai-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
      }
      
      .ai-message.user .ai-avatar {
        background: ${config.primaryColor};
        color: white;
      }
      
      .ai-message.assistant .ai-avatar {
        background: #f1f3f4;
        color: #5f6368;
      }
      
      .ai-chat-input-container {
        padding: 15px;
        background: white;
        border-top: 1px solid #e1e5e9;
      }
      
      .ai-chat-input-wrapper {
        display: flex;
        align-items: flex-end;
        background: #f8f9fa;
        border-radius: 25px;
        padding: 8px;
        border: 1px solid #e1e5e9;
      }
      
      .ai-chat-input {
        flex: 1;
        border: none;
        background: transparent;
        padding: 8px 12px;
        font-size: 14px;
        resize: none;
        outline: none;
        max-height: 100px;
        min-height: 20px;
      }
      
      .ai-send-button {
        background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }
      
      .ai-send-button:hover {
        transform: scale(1.05);
      }
      
      .ai-send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      .ai-typing-indicator {
        display: none;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .ai-typing-indicator .ai-avatar {
        background: #f1f3f4;
        color: #5f6368;
      }
      
      .ai-typing-dots {
        background: white;
        border: 1px solid #e1e5e9;
        border-radius: 18px;
        padding: 12px 16px;
        margin-left: 8px;
      }
      
      .ai-typing-dots span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #999;
        margin: 0 2px;
        animation: typing 1.4s infinite;
      }
      
      .ai-typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .ai-typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.5;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .ai-chat-messages::-webkit-scrollbar {
        width: 4px;
      }
      
      .ai-chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .ai-chat-messages::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 2px;
      }
      
      @media (max-width: 480px) {
        .ai-chat-window {
          width: calc(100% - 40px);
          height: calc(100% - 120px);
          bottom: 80px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create DOM elements
  function createChatElements() {
    // Create container
    const container = document.createElement('div');
    container.className = 'ai-chat-widget-container';
    
    // Create chat bubble
    const bubble = document.createElement('div');
    bubble.className = 'ai-chat-bubble';
    bubble.innerHTML = config.bubbleIcon;
    bubble.setAttribute('aria-label', 'Open chat');
    bubble.setAttribute('role', 'button');
    bubble.setAttribute('tabindex', '0');
    
    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chat-window';
    
    // Create chat header
    const header = document.createElement('div');
    header.className = 'ai-chat-header';
    
    // Create left side container for profile photo and title
    const headerLeft = document.createElement('div');
    headerLeft.className = 'ai-chat-header-left';
    
    // Create profile photo
    const profilePhoto = document.createElement('img');
    profilePhoto.className = 'ai-chat-profile-photo';
    profilePhoto.src = config.profileImageUrl;
    profilePhoto.alt = 'AI Assistant Profile';
    
    const title = document.createElement('h2');
    title.textContent = config.chatTitle;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'ai-chat-close';
    closeButton.innerHTML = config.closeIcon;
    closeButton.setAttribute('aria-label', 'Close chat');
    
    headerLeft.appendChild(profilePhoto);
    headerLeft.appendChild(title);
    header.appendChild(headerLeft);
    header.appendChild(closeButton);
    
    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'ai-chat-messages';
    messagesContainer.id = 'aiChatMessages';
    
    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-typing-indicator';
    typingIndicator.id = 'ai-typing-indicator';
    
    const typingAvatar = document.createElement('div');
    typingAvatar.className = 'ai-avatar';
    typingAvatar.textContent = 'AI';
    
    const typingDots = document.createElement('div');
    typingDots.className = 'ai-typing-dots';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      typingDots.appendChild(dot);
    }
    
    typingIndicator.appendChild(typingAvatar);
    typingIndicator.appendChild(typingDots);
    
    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'ai-chat-input-container';
    
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'ai-chat-input-wrapper';
    
    const textarea = document.createElement('textarea');
    textarea.className = 'ai-chat-input';
    textarea.id = 'aiChatInput';
    textarea.placeholder = 'Type your message...';
    textarea.rows = 1;
    
    const sendButton = document.createElement('button');
    sendButton.className = 'ai-send-button';
    sendButton.id = 'aiSendButton';
    sendButton.innerHTML = config.sendIcon;
    sendButton.setAttribute('aria-label', 'Send message');
    
    inputWrapper.appendChild(textarea);
    inputWrapper.appendChild(sendButton);
    inputContainer.appendChild(inputWrapper);
    
    // Assemble chat window
    chatWindow.appendChild(header);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(typingIndicator);
    chatWindow.appendChild(inputContainer);
    
    // Add elements to container
    container.appendChild(bubble);
    container.appendChild(chatWindow);
    
    // Add container to document
    document.body.appendChild(container);
    
    return {
      bubble,
      chatWindow,
      closeButton,
      messagesContainer,
      typingIndicator,
      textarea,
      sendButton
    };
  }

  // AIChatApp class
  class AIChatApp {
    constructor(elements) {
      this.elements = elements;
      this.chatMessages = elements.messagesContainer;
      this.chatInput = elements.textarea;
      this.sendButton = elements.sendButton;
      this.typingIndicator = elements.typingIndicator;
      
      this.chatHistory = [];
      this.isProcessing = false;
      this.isOpen = false;
      
      this.initializeEventListeners();
      this.addMessage(config.welcomeMessage, 'assistant');
      this.autoResizeTextarea();
      
      // Display disclaimer message after initialization
      this.displayInitialMessages();
    }
    
    initializeEventListeners() {
      // Toggle chat window
      this.elements.bubble.addEventListener('click', () => this.toggleChat());
      this.elements.closeButton.addEventListener('click', () => this.toggleChat(false));
      
      // Send message
      this.sendButton.addEventListener('click', () => this.sendMessage());
      
      // Send on Enter (but not with Shift+Enter)
      this.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
      
      // Auto-resize textarea
      this.chatInput.addEventListener('input', () => {
        this.autoResizeTextarea();
      });
      
      // Accessibility: close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggleChat(false);
        }
      });
    }
    
    toggleChat(open = !this.isOpen) {
      this.isOpen = open;
      if (open) {
        this.elements.chatWindow.classList.add('active');
        this.chatInput.focus();
      } else {
        this.elements.chatWindow.classList.remove('active');
      }
    }
    
    autoResizeTextarea() {
      this.chatInput.style.height = 'auto';
      this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 100) + 'px';
    }
    
    addMessage(content, role, animate = true, customStyle = null, showTimestamp = true) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `ai-message ${role}`;
      
      const avatar = document.createElement('div');
      avatar.className = 'ai-avatar';
      avatar.textContent = role === 'user' ? 'You' : 'AI';
      
      const bubble = document.createElement('div');
      bubble.className = 'ai-message-bubble';
      
      // Reduce padding when timestamp is shown
      if (showTimestamp) {
        bubble.style.paddingBottom = '7px';
      }
      
      // Convert URLs to clickable links and use innerHTML for HTML support
      const processedContent = this.processLinksInContent(content);
      bubble.innerHTML = processedContent;
      
      // Apply custom styling if provided
      if (customStyle) {
        Object.assign(bubble.style, customStyle);
      }
      
      // Add timestamp if requested
      if (showTimestamp) {
        const timestamp = document.createElement('div');
        timestamp.className = 'ai-message-timestamp';
        timestamp.style.fontSize = '10px';
        timestamp.style.color = '#999';
        timestamp.style.marginTop = '4px';
        
        timestamp.textContent = new Intl.DateTimeFormat(config.locale, {
          timeZone: config.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        
        bubble.appendChild(timestamp);
      }
      
      if (role === 'user') {
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(avatar);
      } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);
      }
      
      this.chatMessages.appendChild(messageDiv);
      
      if (animate) {
        this.scrollToBottom();
      }
      
      return bubble;
    }
    
    processLinksInContent(content) {
      // First, convert line breaks to HTML
      content = content.replace(/\n/g, '<br>');
      
      // Convert markdown links [text](url) to HTML links
      content = content.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: ' + config.primaryColor + '; text-decoration: underline;">$1</a>');
      
      // Convert standalone URLs to clickable links (but avoid double-processing already converted links)
      content = content.replace(/(?<!href=")(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: ' + config.primaryColor + '; text-decoration: underline;">$1</a>');
      
      return content;
    }
    
    showTypingIndicator() {
      this.typingIndicator.style.display = 'flex';
      this.scrollToBottom();
    }
    
    hideTypingIndicator() {
      this.typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    async sendMessage() {
      const message = this.chatInput.value.trim();
      if (!message || this.isProcessing) return;
      
      this.isProcessing = true;
      this.sendButton.disabled = true;
      
      // Add user message
      this.addMessage(message, 'user', true, null, true);
      this.chatHistory.push({ role: 'user', content: message });
      
      // Clear input
      this.chatInput.value = '';
      this.autoResizeTextarea();
      
      // Show typing indicator
      this.showTypingIndicator();
      
      try {
        const response = await fetch(config.chatEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: this.chatHistory
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Create assistant message bubble
        const assistantBubble = this.addMessage('', 'assistant', true, null, true);
        
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                // Check multiple possible response fields
                let responseText = '';
                
                if (parsed.response) {
                  responseText = parsed.response;
                } else if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                  responseText = parsed.choices[0].delta.content;
                } else if (parsed.content) {
                  responseText = parsed.content;
                } else if (typeof parsed === 'string') {
                  responseText = parsed;
                }
                
                if (responseText) {
                  assistantMessage += responseText;
                  
                  // Find existing timestamp element to preserve it
                  const existingTimestamp = assistantBubble.querySelector('.ai-message-timestamp');
                  
                  // Update content while preserving timestamp
                  const processedContent = this.processLinksInContent(assistantMessage);
                  
                  if (existingTimestamp) {
                    // Create a content wrapper to separate message from timestamp
                    const contentDiv = assistantBubble.querySelector('.message-content') || document.createElement('div');
                    contentDiv.className = 'message-content';
                    contentDiv.innerHTML = processedContent;
                    
                    // Clear bubble and rebuild with content + timestamp
                    assistantBubble.innerHTML = '';
                    assistantBubble.appendChild(contentDiv);
                    assistantBubble.appendChild(existingTimestamp);
                  } else {
                    // No timestamp, update normally
                    assistantBubble.innerHTML = processedContent;
                  }
                  
                  this.scrollToBottom();
                }
              } catch (e) {
                console.warn('Failed to parse SSE data:', data);
              }
            }
          }
        }
        
        // Add to chat history
        this.chatHistory.push({ role: 'assistant', content: assistantMessage });
        
      } catch (error) {
        console.error('Error sending message:', error);
        this.hideTypingIndicator();
        this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
      } finally {
        this.isProcessing = false;
        this.sendButton.disabled = false;
        this.chatInput.focus();
      }
    }
    
    displayInitialMessages() {
      // Add disclaimer message with smaller font size
      setTimeout(() => {
        this.addMessage(
          config.disclaimerMessage, 
          'assistant', 
          true,
          { fontSize: '10px', lineHeight: '1.4' }
        );
      }, 2000);
    }
  }

  // Initialize the widget
  function init() {
    injectStyles();
    const elements = createChatElements();
    new AIChatApp(elements);
  }

  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
