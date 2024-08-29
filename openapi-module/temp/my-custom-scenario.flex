{
  "project": {
    "projectName": "Flexbench Project",
    "description": "API Load Testing Project",
    "_id": "fde5e6ea-5ce4-4b6f-bd9c-1c7e3a7e01a6"
  },
  "scenarios": [
    {
      "projectId": "fde5e6ea-5ce4-4b6f-bd9c-1c7e3a7e01a6",
      "scenarioname": "User Scenario",
      "duration": "5",
      "workers": "4",
      "totalclients": "10",
      "throttling": "50000",
      "delay": "1.0",
      "_id": "cde8b2a7-8d0c-4c9e-ae8a-8b1d7c7fa546"
    },
    {
      "projectId": "fde5e6ea-5ce4-4b6f-bd9c-1c7e3a7e01a6",
      "scenarioname": "User Creation Scenario",
      "duration": "5",
      "workers": "4",
      "totalclients": "10",
      "throttling": "50000",
      "delay": "1.0",
      "_id": "a1f8e3c9-7b6a-4e9d-aa5c-2d1f9d1e3c8b"
    }
  ],
  "requests": [
    {
      "scenarioId": "cde8b2a7-8d0c-4c9e-ae8a-8b1d7c7fa546",
      "requestName": "Get Users",
      "url": "localhost:4000",
      "protocol": "",
      "host": "localhost",
      "method": "GET",
      "path": "/users",
      "port": "4000",
      "body": [],
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "_id": "e3bb0f56-35e5-4f4f-af67-cc2c8cb20ab9"
    },
    {
      "scenarioId": "a1f8e3c9-7b6a-4e9d-aa5c-2d1f9d1e3c8b",
      "requestName": "Create User",
      "url": "localhost:4000",
      "protocol": "",
      "host": "localhost",
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
      "_id": "1d2f3a4b-5c6d-7e8f-9a0b-2c3d4e5f6a7b"
    }
  ]
}