import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { plainToClass } from 'class-transformer';
import config from './config.json';
export class MenuProvider implements vscode.TreeDataProvider<MenuItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<MenuItem | undefined | void> = new vscode.EventEmitter<MenuItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<MenuItem | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {

	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: MenuItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: MenuItem): Thenable<MenuItem[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('当前未找到任何工程目录～');
			return Promise.resolve([]);
		}

		return Promise.resolve(this.getChildrenInConfig(element));
	}

	/**
	 * 
	 */
	private getChildrenInConfig(element?: MenuItem): MenuItem[] {
		if (element) {
			return element.children || [];
		} else {
			// 表示根目录，还未生成菜单，json 转成ts对象
			const rootArr = plainToClass(MenuItem, config.menu); // to convert user plain object a single user. also supports arrays
			return rootArr;
		}
	}
}


export class MenuItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command,
		public readonly children?: MenuItem[]
	) {
		super(label, collapsibleState);
	}

	iconPath = {
		light: path.join(__filename, 'images', 'light', 'dependency.svg'),
		dark: path.join(__filename, 'images', 'dark', 'dependency.svg')
	};

	contextValue = 'menuItem';
}
