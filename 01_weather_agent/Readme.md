# Weather Agent

A simple AI agent that fetches weather information for multiple cities using OpenAI's agent framework.

## Features

- Fetches real-time weather data using wttr.in API
- Supports multiple city queries in a single request
- Built with OpenAI Agents SDK

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

3. Run the agent:

```bash
npm run start
```

## Usage

Edit the query in `index.js` to check weather for different cities:

```js
main(`What is the weather of Goa, Delhi and Patiala?`);
```
