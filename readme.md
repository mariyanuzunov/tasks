#### Endpoints

## Categories

#### **/tasks/categories**

- Method - GET
- Authentication: YES
- Get all categories

res:

```JSON
{
	"data": [
		{
			"_id": "623d93e670ee9702e8b7a0e1",
			"title": "Предстоящи",
			"createdAt": "2022-03-25T10:05:26.743Z",
			"updatedAt": "2022-03-25T10:21:25.274Z",
			"__v": 0
		},
		{
			"_id": "623d941470ee9702e8b7a0e3",
			"title": "Активни",
			"createdAt": "2022-03-25T10:06:12.097Z",
			"updatedAt": "2022-03-25T10:06:12.097Z",
			"__v": 0
		},
		{
			"_id": "623d941d70ee9702e8b7a0e5",
			"title": "Просрочени",
			"createdAt": "2022-03-25T10:06:21.514Z",
			"updatedAt": "2022-03-25T10:06:21.514Z",
			"__v": 0
		},
		{
			"_id": "623d942e70ee9702e8b7a0e7",
			"title": "Завършени",
			"createdAt": "2022-03-25T10:06:38.281Z",
			"updatedAt": "2022-03-25T10:06:38.281Z",
			"__v": 0
		}
	]
}
```

---

#### **/tasks/categories**

- Method - POST
- Authentication: YES
- Create new category

req:

```JSON
{
	"title": "Висок приоритет", // unique
}
```

res:

```JSON
{
	"data": {
		"title": "Висок приоритет",
		"_id": "624153b9d172311abca5da4b",
		"createdAt": "2022-03-28T06:20:41.121Z",
		"updatedAt": "2022-03-28T06:20:41.121Z",
		"__v": 0
	}
}
```

---

#### **/tasks/categories/:id**

- Method - PUT
- Authentication: YES
- Update category
- Example param: 624153b9d172311abca5da4b

req:

```JSON
{
	"title": "Висок приоритет", // unique
}
```

res:

```JSON
{
	"data": {
		"_id": "624153b9d172311abca5da4b",
		"title": "Висок приоритет - edited",
		"createdAt": "2022-03-28T06:20:41.121Z",
		"updatedAt": "2022-03-28T06:28:49.015Z",
		"__v": 0
	}
}
```

---

#### **/tasks/categories/:id**

- Method - DELETE
- Authentication: YES
- Delete category
- Example param: 624153b9d172311abca5da4b

res:

```JSON
{
	"data": {
		"_id": "624153b9d172311abca5da4b"
	}
}
```

---

## Tasks

#### **/tasks**

- Method - GET
- Authentication: YES
- Get all tasks
- Query params - page: Number, limit: Number, sortBy?: String, orderBy?: 1 | -1 | 'asc' | 'desc'
- Example:

req url (without pagination):

```JSON
GET /tasks
```

res:

```JSON
{
	"data": [
		{
			"_id": "624080a10548c88258436de0",
			"title": "Task 1",
			"client": {
				"_id": "623decae94dea337691aea8e",
				"companyName": "FidWeb LTD",
				"eic": "5648791234"
			},
			"assignedTo": [
				{
					"_id": "623da885c001d40e18ceb4cb",
					"firstName": "John"
				}
			],
			"category": {
				"_id": "623d93e670ee9702e8b7a0e1",
				"title": "Предстоящи"
			},
			"priority": "Висок",
			"dateStart": "2022-03-26T00:00:00.000Z",
			"dateEnd": "2022-03-28T00:00:00.000Z",
			"createdAt": "2022-03-27T15:20:01.079Z",
			"updatedAt": "2022-03-27T15:20:01.079Z",
			"__v": 0
		},
		{
			"_id": "624080a40548c88258436de7",
			"title": "Task 2",
			...
		},
		{
			"_id": "624080a90548c88258436dee",
			"title": "Task 3",
			...
		},
		{
			"_id": "624080ac0548c88258436df5",
			"title": "Task 4",
			...
		},
		{
			"_id": "624080b00548c88258436dfc",
			"title": "Task 5",
			...
		},
		{
			"_id": "624080b40548c88258436e03",
			"title": "Task 6",
			...
		},
		...
		{
			"_id": "62409b662062fe3bc37c554a",
			"title": "Task 18",
		...
		}
	],
}
```

req url (pagination):

```JSON
GET /tasks?page=1&limit=5
```

res:

```JSON
{
	"data": [
		{
			"_id": "624080a10548c88258436de0",
			"title": "Task 1",
			"client": {
				"_id": "623decae94dea337691aea8e",
				"companyName": "FidWeb LTD",
				"eic": "5648791234"
			},
			"assignedTo": [
				{
					"_id": "623da885c001d40e18ceb4cb",
					"firstName": "John"
				}
			],
			"category": {
				"_id": "623d93e670ee9702e8b7a0e1",
				"title": "Предстоящи"
			},
			"priority": "Висок",
			"dateStart": "2022-03-26T00:00:00.000Z",
			"dateEnd": "2022-03-28T00:00:00.000Z",
			"createdAt": "2022-03-27T15:20:01.079Z",
			"updatedAt": "2022-03-27T15:20:01.079Z",
			"__v": 0
		},
		{
			"_id": "624080a40548c88258436de7",
			"title": "Task 2",
			...
		},
		{
			"_id": "624080a90548c88258436dee",
			"title": "Task 3",
			...
		},
		{
			"_id": "624080ac0548c88258436df5",
			"title": "Task 4",
			...
		},
		{
			"_id": "624080b00548c88258436dfc",
			"title": "Task 5",
			...
		}
	],
	"paginator": {
		"totalDocs": 18,
		"limit": 5,
		"totalPages": 4,
		"page": 1,
		"pagingCounter": 1,
		"hasPrevPage": false,
		"hasNextPage": true,
		"prevPage": null,
		"nextPage": 2
	}
}
```

---

#### **/tasks/:id**

- Method - GET
- Authentication: YES
- Get task details
- Example param: 624080a10548c88258436de0

res:

```JSON
{
	"data": {
		"_id": "624080a10548c88258436de0",
		"title": "Task 1",
		"client": {
			"_id": "623decae94dea337691aea8e",
			"companyName": "FidWeb LTD",
			"eic": "5648791234"
		},
		"author": "623d9efae686a87f39a5daf4",
		"assignedTo": [
			{
				"_id": "623da885c001d40e18ceb4cb",
				"firstName": "John"
			}
		],
		"category": {
			"_id": "623d93e670ee9702e8b7a0e1",
			"title": "Предстоящи"
		},
		"priority": "Висок",
		"description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		"dateStart": "2022-03-26T00:00:00.000Z",
		"dateEnd": "2022-03-28T00:00:00.000Z",
		"createdAt": "2022-03-27T15:20:01.079Z",
		"updatedAt": "2022-03-27T15:20:01.079Z",
		"__v": 0
	}
}
```

---

#### **/tasks**

- Method - POST
- Authentication: YES
- Create new task

req:

```JSON
{
    "title": "Създаване на Анализ + Оферта",
    "client": "623decae94dea337691aea8e",
    "assignedTo": ["623da885c001d40e18ceb4cb", "623d9efae686a87f39a5daf4"],
    "category": "623d93e670ee9702e8b7a0e1",
    "priority": "Среден", // "Нисък" | "Среден" | "Висок"
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "dateStart": "2022-03-28T00:00:00.000Z",
    "dateEnd": "2022-03-30T00:00:00.000Z"
}
```

res:

```JSON
{
	"data": {
		"title": "Създаване на Анализ + Оферта",
		"client": {
			"_id": "623decae94dea337691aea8e",
			"companyName": "FidWeb LTD",
			"eic": "5648791234"
		},
		"author": "623d9efae686a87f39a5daf4",
		"assignedTo": [
			{
				"_id": "623da885c001d40e18ceb4cb",
				"firstName": "John"
			},
			{
				"_id": "623d9efae686a87f39a5daf4",
				"firstName": "Mariyan"
			}
		],
		"category": {
			"_id": "623d93e670ee9702e8b7a0e1",
			"title": "Предстоящи"
		},
		"priority": "Среден",
		"description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		"dateStart": "2022-03-28T00:00:00.000Z",
		"dateEnd": "2022-03-30T00:00:00.000Z",
		"_id": "62415f24d172311abca5da5f",
		"createdAt": "2022-03-28T07:09:24.883Z",
		"updatedAt": "2022-03-28T07:09:24.883Z",
		"__v": 0
	}
}
```

---

#### **/tasks/:id**

- Method - PUT
- Authentication: YES
- Update task
- Example param: 62415f24d172311abca5da5f

req:

```JSON
{
    "priority": "Нисък"
}
```

res: the updated document

```JSON
{
	"data": {
		"_id": "62415f24d172311abca5da5f",
        ...
		"priority": "Нисък",
		...
		"updatedAt": "2022-03-28T07:13:01.195Z",
	}
}
```

---

#### **/tasks/:id**

- Method - DELETE
- Authentication: YES
- Delete task
- Example param: 62415f24d172311abca5da5f

res: deleted item's id

```JSON
{
	"data": {
		"_id": "62415f24d172311abca5da5f"
	}
}
```

---

## Comments

#### **/tasks/:id/comments**

- Method - GET
- Authentication: YES
- Get task comments
- Example param: 624080a10548c88258436de0

res:

```JSON
{
	"data": [
		{
			"_id": "623ddf7676671a1fb40c90ad",
			"task": "623dd0e568fc378bd80447d1",
			"author": {
				"_id": "623d9efae686a87f39a5daf4",
				"email": "mariyan@test.com",
				"firstName": "Mariyan",
				"lastName": "Uzunov",
				"createdAt": "2022-03-25T10:52:42.800Z",
				"updatedAt": "2022-03-25T10:52:42.800Z",
				"__v": 0
			},
			"content": "test comment",
			"createdAt": "2022-03-25T15:27:50.164Z",
			"updatedAt": "2022-03-25T15:27:50.164Z",
			"__v": 0
		},
		{
			"_id": "623ddfe0b5a9b3b8ba1ece04",
			...
			"content": "second comment",
            ...
		},
		{
			"_id": "623de034e7fa34890615afe3",
			...
			"content": "third comm",
			...
		},
		{
			"_id": "623de0577e0d128dcfef1e24",
			...
			"content": "third comm",
			...
		}
	]
}
```

---

#### **/tasks/:id/comments**

- Method - POST
- Authentication: YES
- Create new comment
- Example param: 624080a10548c88258436de0

req:

```JSON
{
    "content": "some spam comment"
}
```

res:

```JSON
{
	"data": {
		"task": "624080a10548c88258436de0",
		"author": {
			"_id": "623d9efae686a87f39a5daf4",
			"firstName": "Mariyan"
		},
		"content": "some spam comment",
		"_id": "62416703ccc02634d12c2d08",
		"createdAt": "2022-03-28T07:42:59.783Z",
		"updatedAt": "2022-03-28T07:42:59.783Z",
		"__v": 0
	}
}
```
