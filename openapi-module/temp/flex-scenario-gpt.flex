{
  "project": {
    "projectName": "User Management Project",
    "description": "APIs for managing user information",
    "_id": "e1a3d9d0-0f2d-4c8f-aa45-5e1c41bd1d62"
  },
  "scenarios": [
    {
      "projectId": "e1a3d9d0-0f2d-4c8f-aa45-5e1c41bd1d62",
      "scenarioName": "User Creation Scenario",
      "duration": "5",
      "workers": "4",
      "totalclients": "10",
      "throttling": "50000",
      "delay": "1.0",
      "_id": "3cb4f9d7-4f12-4a52-8c6e-33a15e2d3f8b"
    },
    {
      "projectId": "e1a3d9d0-0f2d-4c8f-aa45-5e1c41bd1d62",
      "scenarioName": "User Retrieval Scenario",
      "duration": "5",
      "workers": "4",
      "totalclients": "10",
      "throttling": "40000",
      "delay": "0.5",
      "_id": "6d1f79a1-3c04-4dcb-9c34-6c1b0a2f4dab"
    }
  ],
  "requests": [
    {
      "scenarioId": "3cb4f9d7-4f12-4a52-8c6e-33a15e2d3f8b",
      "requestName": "User Creation Request",
      "url": "www.example.com/api",
      "protocol": "",
      "host": "www.example.com",
      "method": "POST",
      "path": "/users",
      "port": "4000",
      "body": [
        {
          "key": "name",
          "value": "John Doe",
          "type": "TEXT",
          "description": ""
        },
        {
          "key": "email",
          "value": "johndoe@example.com",
          "type": "TEXT",
          "description": ""
        }
      ],
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "_id": "7f20bcf1-3e0f-43fd-85b2-5c8c5d8b558f"
    },
    {
      "scenarioId": "6d1f79a1-3c04-4dcb-9c34-6c1b0a2f4dab",
      "requestName": "User Retrieval Request",
      "url": "www.example.com/api",
      "protocol": "",
      "host": "www.example.com",
      "method": "GET",
      "path": "/users/{id}",
      "port": "4000",
      "body": [],
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "_id": "a1f6c4b4-8d4b-4d5c-9f8c-cf4e4aa4d1c9"
    }
  ]
}