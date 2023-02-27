<h1 align="center"><img align="center" height="30" src="assets/icon-128.png"> Quickfix AI (Alpha Release)</h1>

<h3 align="center">Search On Page With GPT.</h3>

## Introduction 👋

Quickfix AI is an extension for Google Chrome that provides you **instant answer of queries about the current webpage** using AI.

With Quickfix AI, you can:
- ⏳ Instant Answers: Quick and accurate results with GPT technology
- 🔍 Semantic Search: Precise answers based on word meaning
- 🧠 Human-like Responses: Natural language responses for easy comprehension
- 💡 Vector Search: Efficient search on large webpages, without exceeding GPT token limit.

## Demo 📽

[![demo video](assets/chrome_extension_job_demo.gif)](https://www.youtube.com/watch?v=Foh8n8B3mmw)

*If the video is not loading for you, [watch it on YouTube](https://www.youtube.com/watch?v=Foh8n8B3mmw).*

## Why Quickfix AI? 🤔

Traditional web search tools like Google Chrome Find tool lack the ability to understand the semantic nature of words and fail to provide precise results when it comes to searching for information on web pages. Existing tools only search based on keywords, limiting their effectiveness. I need a more advanced solution to quickly obtain relevant information from web pages I'm currently browsing. Therefore, I developed the Quickfix AI chrome extension, which utilizes GPT technology to enable users to ask questions and get accurate, human-like responses about the webpage they are on. This extension aims to provide a more efficient and effective way of searching for information on web pages.

Now let's get started!

## Installation 📦

Quickfix AI is in its Alpha phase, if you would like to use and explore it at this stage, you can follow the steps below to set it up. However, if you prefer to wait for a more reliable version with an easy installation process through Chrome Web Store, you can [Join the Waitlist](https://forms.gle/ZN4hmSuThpYAE8kZ7) for the Stable release.

**Prerequisite:**

- Python v3.10 + Poetry

**Setup:**

1. Clone Quickfix AI repo
2. Switch on the Developer mode in Google Chrome by visiting `chrome://extensions`
3. Load unpacked this folder.
4. Update the environment variables in both files, `/chrome-extension/env.js` (you probably don't need to update this file if your backend will be running in the localhost or 127.0.0.1) and `/backend/.env`
5. Run the backend `make run-backend`

## How to Use Quickfix AI 🛠

1. Visit a webpage you want to search on.
2. Open the Quickfix AI chrome extension by clicking on it icon in the top-right corner
3. Ask a question
4. Wait for the response and an answer will be displayed by the Quickfix AI

Enjoy the instant Search On Page with Quickfix AI! 🎉