/* eslint-disable n8n-nodes-base/node-param-resource-with-plural-option */
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { generalOperations } from './GeneralDescription';

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
						name: 'General',
						value: 'general',
					},
				],
				default: 'general',
				//TODO
				//tasks
				//swap-indexes
				//multi-search
				//keys
				//indexes
			},
			...generalOperations
		],
	};
}
