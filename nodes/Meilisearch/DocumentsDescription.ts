import type {
	INodeProperties
} from 'n8n-workflow';

export const documentsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documents'],
			},
		},
		default: 'getMany',
		options: [
			{
				name: 'Add or Replace Documents',
				value: 'addOrReplaceDocuments',
				action: 'Add or replace documents',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents"}}',
						qs: {},
						body: {},
					},
					send: {
						preSend: [
							async function (this, requestOptions) {
								console.log(requestOptions)
								return requestOptions
							}
						],
					},
				},
			},
			{
				name: 'Get Documents',
				value: 'getMany',
				action: 'Get documents',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents"}}',
						qs: {}
					},
				},
			},
			{
				name: 'Get One Document',
				value: 'getDocument',
				action: 'Get one document by UID',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents/" + $parameter["documentId"]}}',
						qs: {}
					},
				},
			},
			{
				name: 'Delete One Document',
				value: 'deleteDocument',
				action: 'Delete one document by UID',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents/" + $parameter["documentId"]}}',
						qs: {}
					},
				},
			},
		],
	}
];

export const documentsFields: INodeProperties[] = [
	{
		displayName: 'Index UID',
		name: 'uid',
		description: 'Name of the index',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['documents'],
			},
		},
	},
	{
		displayName: 'Document ID',
		name: 'documentId',
		description: 'UId for the document',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['documents'],
				operation: ['getDocument', 'deleteDocument'],
			},
		},
	},
	{
		displayName: 'Documents JSON',
		name: 'documentsJson',
		description: 'JSON objects to add or replace. This passes a string.',
		hint: '{id: 1, fieldName: "fieldValue"}, {id: 2, fieldName: "fieldValue"}',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['documents'],
				operation: ['addOrReplaceDocuments'],
			},
		},
		routing: {
			request: {
				body: ['={{JSON.parse($value)}}'],
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		description: 'Comma-separated list of fields to display for an API resource. By default it contains all fields of an API resource.',
		default: '*',
		displayOptions: {
			show: {
				resource: ['documents'],
				operation: ['getDocument'],
			},
		},
		routing: {
			request: {
				qs: {
					fields: '={{$value.replaceAll(" ", "")}}',
				},
			},
		},
	},
]
export const documentsAdditionalFields: INodeProperties[] = [
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
				resource: ['documents'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Offset',
				name: 'offset',
				description: 'Number of results to skip',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				routing: {
					request: {
						qs: {
							offset: '={{$value}}',
						},
					},
				},
			},
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
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				description: 'Comma-separated list of fields to display for an API resource. By default it contains all fields of an API resource.',
				default: '*',
				routing: {
					request: {
						qs: {
							fields: '={{$value.replaceAll(" ", "")}}',
						},
					},
				},
			},
		],
	},
];
