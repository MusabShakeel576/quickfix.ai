import * as vscode from 'vscode'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export function activate(context: vscode.ExtensionContext) {
	function getSolution() {

	}

	function readSourceCode() {
		vscode.workspace.findFiles('**/*').then(async(files) => {
			const workspace = vscode.workspace.name
			const documents: string[] = []

			for (const file of files) {
				// Ignore if the file is listed in a .gitignore file
				if (file.fsPath.includes('.gitignore')) {
					continue
				}

				vscode.workspace.openTextDocument(file).then(document => {
					documents.push(document.getText())
				})
			}

			axios.post(`${process.env.BACKEND_API_URL}/workspaces/${workspace}`, {
				documents: documents
			  })
			  .then(function (response) {
				console.log(response);
			  })
			  .catch(function (error) {
				console.log(error);
			  });
		})
	}
	readSourceCode()

	let disposable = vscode.commands.registerCommand('quickfix-ai.quickfixAI', () => {
		// TODO: call getSolution
		// vscode.window.showInformationMessage('Hello World from quickfix.ai!')
	})

	context.subscriptions.push(disposable)
}

export function deactivate() {}
