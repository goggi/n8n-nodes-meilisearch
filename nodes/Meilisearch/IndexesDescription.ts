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
		default: 'swapIndexes',
		options: [
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
		],
	},
];

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
