import * as vscode from 'vscode'
import axios from 'axios'
import { TextEncoder } from 'util'

import { BACKEND_API_URL } from './env'

type RequestAPI = {
	name: string;
	input?: string;
	documents?: string[];
}

export async function activate(context: vscode.ExtensionContext) {
	// TODO: use proper return type instead of any
	async function requestAPI(data: RequestAPI, endpoint: string): Promise<any> {
		const response = await axios.post(
			`${BACKEND_API_URL}/workspace/${endpoint}`,
			data
		)
		return response.data
	}
	const documents = await readSourceCode();
	const data = {name: vscode.workspace.name, documents}
	await requestAPI(data, "index")

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

			const data = {name: vscode.workspace.name, input}
			const result = await requestAPI(data, "solution")

			await vscode.workspace.fs.writeFile(
				fileURI,
				new TextEncoder().encode(result.solution.response)
			);
			await vscode.commands.executeCommand("markdown.showPreview", fileURI);
			vscode.workspace.fs.delete(fileURI)
			
			progress.report({ increment: 100 });
		});

	}));
}

export function deactivate() { }
