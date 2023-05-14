import type {
	INodeProperties
} from 'n8n-workflow';

export const indexesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['indexes'],
			},
		},
		default: 'listIndexes',
		options: [
			{
				name: 'List Indexes',
				value: 'listIndexes',
				action: 'List indexes',
				routing: {
					request: {
						method: 'GET',
						url: '/indexes',
						qs: {}
					},
				},
			},
			{
				name: 'Swap Indexes',
				value: 'swapIndexes',
				action: 'Swap the documents settings and task history of two or more indexes you can only swap indexes in pairs however a single request can swap as many index pairs as you wish swapping indexes is an atomic transaction either all indexes are successfully swapped or none are',
				routing: {
					request: {
						method: 'POST',
						url: '/swap-indexes',
						qs: {},
						body: '',
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								const pairs = this.getNodeParameter('indexPairs') as { 'indexPairsValues': {'uid1': string, 'uid2': string}[]}
								const payload = pairs?.indexPairsValues?.map(value => {return {"indexes": [value.uid1, value.uid2]}})
								requestOptions.body = JSON.stringify(payload)
								return requestOptions
							}
						],
					},
				},
			},
			{
				name: 'Create Index',
				value: 'createIndex',
				action: 'Create an index',
				routing: {
					request: {
						method: 'POST',
						url: 'indexes',
						qs: {},
						body: {
							"uid": '={{$parameter["uid"]}}',
							"primaryKey": '={{$parameter["primaryKey"]}}',
						},
					},
				},
			},
		],
	},
];

export const indexesFields: INodeProperties[] = [
	{
		displayName: 'UID',
		name: 'uid',
		description: 'Name of the index',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['indexes'],
				operation: ['createIndex'],
			},
		},
	},
	{
		displayName: 'Primary Key',
		name: 'primaryKey',
		description: 'Unique attribute of the index',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['indexes'],
				operation: ['createIndex'],
			},
		},
	},
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
				resource: ['indexes'],
				operation: ['listIndexes'],
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
				description: 'Number of indexes to skip',
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
]

export const swapIndexesFields: INodeProperties[] = [
	{
		displayName: 'Index Pairs',
		name: 'indexPairs',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Index Pair to Swap',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['indexes'],
				operation: ['swapIndexes'],
			},
		},
		options: [
			{
				name: 'indexPairsValues',
				displayName: 'Index Pair',
				values: [
					{
						displayName: 'Index 1 UID',
						name: 'uid1',
						type: 'string',
						description: 'The UID string for the index',
						default: '',
					},
					{
						displayName: 'Index 2 UID',
						name: 'uid2',
						type: 'string',
						description: 'The UID string for the other index',
						default: '',
					},
				],
			},
		],
	},
];
