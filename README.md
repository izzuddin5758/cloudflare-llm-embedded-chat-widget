# AI Assistant - Embeddable Chat Widget using Cloudflare LLM Chat App


Cloudflare LLM chat : https://github.com/cloudflare/templates/tree/v5.2.0/llm-chat-app-template

A lightweight, customizable chat widget that can be easily integrated into any website. This widget provides a floating chat bubble that expands into a fully functional AI assistant chat window powered by Cloudflare Workers AI.

## Features

- 🚀 **Easy Integration** - Just add one script tag to your website
- 🎨 **Fully Customizable** - Colors, position, messages, and branding
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Streaming** - Live AI responses with typing indicators
- 🔧 **Flexible API** - Compatible with any chat API endpoint
- ♿ **Accessible** - Built with accessibility best practices
- 🌐 **Cross-Origin Ready** - CORS-enabled for any domain

## Quick Start

### 1. Basic Integration

Add the following code to your website, preferably just before the closing `</body>` tag:

```html
<!-- Basic setup with default configuration -->
<script src="https://your-domain.com/embedded-chat-widget.js"></script>
```

### 2. Custom Configuration

For a customized experience, configure the widget before loading the script:

```html
<script>
  // Configuration options (all are optional except CHAT_ENDPOINT)
  window.CHAT_ENDPOINT = 'https://your-cloudflare-llm.workers.dev/api/chat'; // Required: Your chat API endpoint
  window.CHAT_POSITION = 'right'; // Optional: 'right' or 'left'
  window.CHAT_PRIMARY_COLOR = '#007bff'; // Optional: Primary theme color
  window.CHAT_SECONDARY_COLOR = '#0056b3'; // Optional: Secondary theme color
  window.CHAT_WELCOME_MESSAGE = 'Hello! How can I help you today?'; // Optional: Welcome message
  window.CHAT_TITLE = 'AI Assistant'; // Optional: Chat window title
  window.CHAT_DISCLAIMER_MESSAGE = 'This AI assistant provides general information.'; // Optional: Disclaimer
  window.CHAT_PROFILE_IMAGE = 'https://your-domain.com/ai-avatar.png'; // Optional: AI avatar image
</script>
<script src="https://your-website.com/embedded-chat-widget.js"></script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CHAT_ENDPOINT` | string | `'/api/chat'` | **Required**: Your chat API endpoint URL |
| `CHAT_POSITION` | string | `'right'` | Widget position: `'right'` or `'left'` |
| `CHAT_PRIMARY_COLOR` | string | `'#007bff'` | Primary theme color (hex code) |
| `CHAT_SECONDARY_COLOR` | string | `'#0056b3'` | Secondary theme color (hex code) |
| `CHAT_WELCOME_MESSAGE` | string | `'Hello! How can I help?'` | Initial greeting message |
| `CHAT_TITLE` | string | `'AI Assistant'` | Chat window header title |
| `CHAT_DISCLAIMER_MESSAGE` | string | `''` | Optional disclaimer text |
| `CHAT_PROFILE_IMAGE` | string | `''` | URL to AI assistant avatar image |
| `CHAT_BUBBLE_ICON` | string | `(default SVG)` | Custom chat bubble icon (SVG) |
| `CHAT_CLOSE_ICON` | string | `(default SVG)` | Custom close button icon (SVG) |
| `CHAT_SEND_ICON` | string | `(default SVG)` | Custom send button icon (SVG) |

## API Requirements

Your chat API endpoint should follow these specifications:

### Request Format
```json
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}
```

### Response Format
The API should return Server-Sent Events (SSE) with the following format:
