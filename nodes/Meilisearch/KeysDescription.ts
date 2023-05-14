import type {
	INodeProperties,
} from 'n8n-workflow';

export const keysOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['keys'],
			},
		},
		default: 'getKeys',
		options: [
			{
				name: 'Get API Keys',
				value: 'getKeys',
				action: 'Returns the 20 most recently created keys in a results array expired keys are included in the response but deleted keys are not',
				routing: {
					request: {
						method: 'GET',
						url: '/keys',
						qs: {}
					},
				},
			},
		],
	},
];

export const getKeysFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		noDataExpression: true,
		name: 'additionalFields',
		placeholder: 'Add Field',
		description: 'Additional fields to add',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['keys'],
				operation: ['getKeys'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				description: 'Max number of results to return',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				description: 'Number of results to skip',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				routing: {
					request: {
						qs: {
							offset: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
