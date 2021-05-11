'use strict';

import * as vscode from 'vscode';
import 'reflect-metadata';
import { MenuProvider } from './menu';
import webviewHandler from './webview';
export function activate(context: vscode.ExtensionContext) {
	// 添加侧边栏
	const menuProvider = new MenuProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('lazer', menuProvider);
	vscode.commands.registerCommand('lazer.refreshEntry', () => menuProvider.refresh());
	vscode.commands.registerCommand('lazer.openTemplateConfig', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
	// 添加webview页面
	webviewHandler(context);
}