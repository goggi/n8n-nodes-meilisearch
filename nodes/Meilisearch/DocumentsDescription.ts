import {
	NodeOperationError,
	type IExecuteSingleFunctions,
	type IHttpRequestOptions,
	type INodeProperties,
	PreSendAction
} from 'n8n-workflow';

export function validateJSON(json: string | undefined): any {
	let result;
	try {
		result = JSON.parse(json!);
	} catch (exception) {
		result = undefined;
	}
	return result;
}

function parseAndSetBodyJsonArray(
	parameterName: string,
): PreSendAction {
	return async function (
		this: IExecuteSingleFunctions,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		if (!requestOptions.body) requestOptions.body = [];
		const raw = this.getNodeParameter(parameterName) as string;
		const parsedJson = validateJSON(raw);

		if (parsedJson === undefined) {
			throw new NodeOperationError(
				this.getNode(),
				'Invalid JSON. Please check your JSON input',
			);
		}

		let body = [];
		if (Array.isArray(parsedJson)) {
			body = parsedJson;
		} else if (typeof parsedJson === 'object') {
			body.push(parsedJson);
		} else {
			throw new NodeOperationError(
				this.getNode(),
				'Invalid JSON. Please check your JSON input',
			);
		}
		requestOptions.body = body;
		return requestOptions;
	}
}

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
						preSend: [parseAndSetBodyJsonArray('documentsJson')],
					}
				},
			},
			{
				name: 'Add or Update Documents',
				value: 'addOrUpdateDocuments',
				action: 'Add or update documents',
				routing: {
					request: {
						method: 'PUT',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents"}}',
						qs: {},
						body: {},
					},
					send: {
						preSend: [parseAndSetBodyJsonArray('documentsJson')],
					}
				},
			},
			{
				name: 'Delete All Document',
				value: 'deleteAllDocuments',
				action: 'Delete all documents in an index',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents"}}',
						qs: {},
						body: {},
					},
				},
			},
			{
				name: 'Delete Batch of Documents',
				value: 'deleteDocumentsBatch',
				action: 'Delete batch of documents by UID',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/indexes/" + $parameter["uid"] + "/documents/delete-batch"}}',
						qs: {},
						body: {},
					},
					send: {
						preSend: [parseAndSetBodyJsonArray('uids')],
					}
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
						qs: {},
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
						qs: {},
					},
				},
			},
		],
	},
];

export const documentsFields: INodeProperties[] = [
	{
		displayName: 'Index UID',
		name: 'uid',
		description: 'Name of the index',
		type: 'options',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['documents'],
			},
		},
		typeOptions: {
			loadOptions: {
					routing: {
							request: {
									method: 'GET',
									url: '={{"/indexes"}}',
							},
							output: {
									postReceive: [
											{
												// When the returned data is nested under another property
												// Specify that property key
												type: 'rootProperty',
												properties: {
													property: 'results',
												},
											},
											{
												type: 'setKeyValue',
												properties: {
													name: '={{$responseItem.uid}} KeyField:{{$responseItem.primaryKey}}',
													value: '={{$responseItem.uid}}',
												},
											},
											{
													type: 'sort',
													properties: {
															key: 'name',
													},
											},
									],
							},
					},
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
		displayName: 'UIDs',
		name: 'uids',
		description: 'Delete a selection of documents based on an array of document IDs',
		hint: 'JSON array of document IDs',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['documents'],
				operation: ['deleteDocumentsBatch'],
			},
		},
	},
	{
		displayName: 'Documents JSON',
		name: 'documentsJson',
		description: 'JSON object(s) to add, update, or replace. This must be valid JSON.',
		hint: '{{ JSON.stringify($json) }} or {{ JSON.stringify($jmespath($input.all(), "[].json")) }}',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['documents'],
				operation: ['addOrReplaceDocuments', 'addOrUpdateDocuments'],
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		description:
			'Comma-separated list of fields to display for an API resource. By default it contains all fields of an API resource.',
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
];
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
				description:
					'Comma-separated list of fields to display for an API resource. By default it contains all fields of an API resource.',
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
