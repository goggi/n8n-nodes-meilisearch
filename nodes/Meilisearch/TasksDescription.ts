import type {
	INodeProperties,
} from 'n8n-workflow';

export const tasksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tasks'],
			},
		},
		default: 'getAllTasks',
		options: [
			{
				name: 'Get All Tasks',
				value: 'getAllTasks',
				action: 'Get all tasks',
				description: 'The /tasks route allows you to List all tasks globally, regardless of index. The task objects are contained in the results array.',
				routing: {
					request: {
						method: 'GET',
						url: '/tasks',
						qs: {}
					},
				},
			},
		],
	},
];

export const getAllTasksFields: INodeProperties[] = [
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
				resource: ['tasks'],
				operation: ['getAllTasks'],
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
				displayName: 'From',
				name: 'from',
				description: 'Fetch the next set of results from the given UID',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: null,
				routing: {
					request: {
						qs: {
							from: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'UIDs',
				name: 'uids',
				description: 'Comma delimited list of UID(s) to filter results by',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							uids: '={{$value.replaceAll(" ", "")}}',
						},
					},
				},
			},
			{
				displayName: 'Index UIDs',
				name: 'indexUids',
				description: 'Comma delimited list of Index UID(s) to filter results by',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							indexUids: '={{$value.replaceAll(" ", "")}}',
						},
					},
				},
			},
			{
				displayName: 'Statuses',
				name: 'statuses',
				description: 'Comma delimited list of Task Status(es) to filter results by',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							statuses: '={{$value.replaceAll(" ", "")}}',
						},
					},
				},
			},
			{
				displayName: 'Types',
				name: 'types',
				description: 'Comma delimited list of Task Type(s) to filter results by',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							types: '={{$value.replaceAll(" ", "")}}',
						},
					},
				},
			},
			{
				displayName: 'Canceled By',
				name: 'canceledBy',
				description: 'Comma delimited list of Task UID(s) that canceled another task(s)',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							canceledBy: '={{$value.replaceAll(" ", "")}}',
						},
					},
				},
			},
			{
				displayName: 'Before Enqueued At',
				name: 'beforeEnqueuedAt',
				description: 'Permits to filter tasks based on their enqueuedAt time',
				type: 'dateTime',
				default: '',
				routing: {
					request: {
						qs: {
							beforeEnqueuedAt: '={{new Date($value).toJSON()}}',
						},
					},
				},
			},
			{
				displayName: 'After Enqueued At',
				name: 'afterEnqueuedAt',
				description: 'Permits to filter tasks based on their enqueuedAt time',
				type: 'dateTime',
				default: '',
				routing: {
					request: {
						qs: {
							afterEnqueuedAt: '={{new Date($value).toJSON()}}',
						},
					},
				},
			},
			{
				displayName: 'Before Started At',
				name: 'beforeStartedAt',
				description: 'Permits to filter tasks based on their startedAt time',
				type: 'dateTime',
				default: '',
				routing: {
					request: {
						qs: {
							beforeStartedAt: '={{new Date($value).toJSON()}}',
						},
					},
				},
			},
			{
				displayName: 'After Started At',
				name: 'afterStartedAt',
				description: 'Permits to filter tasks based on their startedAt time',
				type: 'dateTime',
				default: '',
				routing: {
					request: {
						qs: {
							afterStartedAt: '={{new Date($value).toJSON()}}',
						},
					},
				},
			},
			{
				displayName: 'Before Finished At',
				name: 'beforeFinishedAt',
				description: 'Permits to filter tasks based on their finishedAt time',
				type: 'dateTime',
				default: '',
				routing: {
					request: {
						qs: {
							beforeFinishedAt: '={{new Date($value).toJSON()}}',
						},
					},
				},
			},
			{
				displayName: 'After Finished At',
				name: 'afterFinishedAt',
				description: 'Permits to filter tasks based on their finishedAt time',
				type: 'dateTime',
				default: '',
				routing: {
					request: {
						qs: {
							afterFinishedAt: '={{new Date($value).toJSON()}}',
						},
					},
				},
			},
		],
	},
];
