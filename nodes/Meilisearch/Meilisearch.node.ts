/* eslint-disable n8n-nodes-base/node-param-resource-with-plural-option */
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { generalOperations } from './GeneralDescription';
import {
	tasksOperations,
	getAllTasksFields,
	deleteTasksFields,
	cancelTasksFields,
	getTaskFields,
} from './TasksDescription';
import { indexesFields, indexesOperations, searchFields, searchOperations, swapIndexesFields } from './IndexesDescription';
import {
	createKeyFields,
	getKeyFields,
	getKeysFields,
	keysOperations,
	updateKeyFields,
} from './KeysDescription';
import { documentsAdditionalFields, documentsFields, documentsOperations } from './DocumentsDescription';

export class Meilisearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Meilisearch',
		name: 'meilisearch',
		icon: 'file:meilisearch.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Meilisearch API',
		defaults: {
			name: 'Meilisearch',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'meilisearchApi',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Documents',
						value: 'documents',
					},
					{
						name: 'General',
						value: 'general',
					},
					{
						name: 'Indexes',
						value: 'indexes',
					},
					{
						name: 'Keys',
						value: 'keys',
					},
					{
						name: 'Search',
						value: 'search',
					},
					{
						name: 'Tasks',
						value: 'tasks',
					},
				],
				default: 'general',
				//TODO
				//multi-search
				//documents
				//indexes settings and sub routes
			},
			...generalOperations,
			// Tasks
			...tasksOperations,
			...getAllTasksFields,
			...deleteTasksFields,
			...cancelTasksFields,
			...getTaskFields,
			// Indexes and Search
			...indexesOperations,
			...searchOperations,
			...swapIndexesFields,
			...indexesFields,
			...searchFields,
			// Keys
			...keysOperations,
			...getKeysFields,
			...getKeyFields,
			...updateKeyFields,
			...createKeyFields,
			// Documents
			...documentsOperations,
			...documentsFields,
			...documentsAdditionalFields
		],
	};
}
