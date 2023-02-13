import * as vscode from 'vscode'
import axios from 'axios'
import { TextEncoder } from 'util'

import { BACKEND_API_URL } from './env'

export function activate(context: vscode.ExtensionContext) {
	async function fetchSolution(input: string): Promise<string> {
		const workspaceName = vscode.workspace.name
		const documents = await readSourceCode()

		const response = await axios.post(
			`${BACKEND_API_URL}/workspace`,
			{ name: workspaceName, input: input, documents: documents }
		)

		return response.data.solution.response
	}

	async function readSourceCode(): Promise<string[]> {
		const files = await vscode.workspace.findFiles('**/*')

		const documents: string[] = []

		for (const file of files) {
			// Ignore if the file is listed in a .gitignore file
			if (file.fsPath.includes('.gitignore')) {
				continue
			}

			const document = await vscode.workspace.openTextDocument(file)
			documents.push(document.getText())
		}

		return documents
	}

	context.subscriptions.push(vscode.commands.registerCommand('quickfix-ai.solve', async () => {
		const input = await vscode.window.showInputBox({ placeHolder: 'Paste the error...' });
		if (input === undefined) {
			vscode.window
				.showInformationMessage('Paste the error for Quickfix AI to find the solution');
			return
		}

		const workspaceFolders = vscode.workspace.workspaceFolders

		if (workspaceFolders === undefined || workspaceFolders.length === 0) {
			vscode.window.showInformationMessage('Workspace Folder is not found');
			return
		}

		const workspaceURI = workspaceFolders[0].uri
		const fileURI = vscode.Uri.file(workspaceURI.path + "/solution-by-quickfix-ai.md")

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Window,
			cancellable: false,
			title: 'Quickfix AI is generating a solution'
		}, async (progress) => {
			progress.report({  increment: 0 });
			
			const solution = await fetchSolution(input)
			await vscode.workspace.fs.writeFile(fileURI, new TextEncoder().encode(solution));
			await vscode.commands.executeCommand("markdown.showPreview", fileURI);
			vscode.workspace.fs.delete(fileURI)
			
			progress.report({ increment: 100 });
		});

	}));
}

export function deactivate() { }
