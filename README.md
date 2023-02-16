<h1 align="center"><img align="center" height="30" src="vscode-extension/assets/icon.png"> Quickfix AI (Alpha Release)</h1>

<h3 align="center">Get Instant Error Solutions with GPT.</h3>

## Introduction 👋

Quickfix AI is an extension for VS Code that provides you **instant solutions for errors in your code** within the code editor using AI.

With Quickfix AI, you can:
- 🧠 Get instant solution for error in real-time
- 💡 Increase your coding understanding and efficiency
- ⏳ Save time and minimize frustration with clear code solutions
- 🔍 Improve your coding skills with in-depth code analysis

## Demo 📽

[![demo video](vscode-extension/assets/demo.gif)](https://www.youtube.com/watch?v=qz2U6S5tWyQ)

*If the video is not loading for you, [watch it on YouTube](https://www.youtube.com/watch?v=qz2U6S5tWyQ).*

## Installation 📦

Quickfix AI is in its Alpha phase, if you would like to use and explore it at this stage, you can follow the steps below to set it up. However, if you prefer to wait for a more reliable version with an easy installation process through VS Code Marketplace, you can [Join the Waitlist](https://forms.gle/ZN4hmSuThpYAE8kZ7) for the Stable release.

**Prerequisite:**

- Python v3.10 + Poetry 
- Node v16 + Yarn

**Setup:**

1. Clone Quickfix AI repo
2. Build the vscode-extension `make install-vscode-extension`
3. Build the backend `make install-backend`
4. Update the environment variables in both folders, `/vscode-extension/src/env.ts` (you probably don't need to update this file if your backend will be running in the localhost or 127.0.0.1) and `/backend/.env`
5. Run the backend `make run-backend`

## How to Use Quickfix AI 🛠

1. Open a workspace/folder in VS Code
2. Open the Command Palette (press `Ctrl + Shift + P` or `Cmd + Shift + P` on Mac)
3. Type "Quickfix AI" and select the command from the list
4. Paste/enter your error or question.
5. Wait for the response and the solution will be displayed in a "solution-by-quickfix-ai markdown" file in your VS Code editor

Enjoy the instant and comprehensive error solutions with Quickfix AI! 🎉
