module.exports = {
    useGPT: false,  // set this to true to use GPT for generating scenarios
    openaiApiKey: process.env.OPENAI_API_KEY,

    consumer: 'desktop-app', // set this to desktop-app/server-app to generate different type of consumable files

    // settings
    model: "gpt-3.5-turbo",  // default model, please use the best model for JSON res as possible
    maxTokens: 1500,  // maximum tokens for the completion
    temperature: 0.7,  // control the creativity of the response

    // prompt template for generating scenarios
    promptTemplate: function(endpoints) {
      if (this.consumer === 'server-app') {
        return  `
        You are given the following API endpoints from an OpenAPI document:

        ${JSON.stringify(endpoints, null, 2)}

        Please generate a Flex scenario JSON file that includes:
        - A "scenarioConfig" object with specific fields:
          - "delay": A range between "0.5-1.5" in seconds.
          - "throttling": A realistic number like "50000".
          - "workers": Number of workers, e.g., "4".
          - "totalclients": A number, e.g., "10".
          - "duration": The duration in minutes, e.g., "5".
        - Each request should include:
          - "method": The HTTP method.
          - "path": The API path, with placeholders like "{id}" where necessary.
          - "port": Use "4000" as the default port.
          - "host": Use "localhost" as the default host.
          - "headers": Include "Content-Type: application/json".
          - "body": Realistic example data based on the request body schema.

        Ensure the generated JSON is syntactically correct, well-structured, and closely resembles the following example:

        Example:
        {
          "scenarioConfig": {
            "scenario": {
              "delay": "0.5-1.5",
              "throttling": "50000",
              "workers": "4",
              "totalclients": "10",
              "duration": "5"
            },
            "requests": [
              {
                "method": "GET",
                "path": "/users",
                "port": "4000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {}
              },
              {
                "method": "POST",
                "path": "/users",
                "port": "4000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {
                  "name": "Joann Aufderhar Jr.",
                  "email": "Pete_Doyle92@hotmail.com"
                }
              },
              {
                "method": "GET",
                "path": "/users/{id}",
                "port": "4000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {}
              }
            ]
          }
        }`} 
        else if (this.consumer === 'desktop-app') {
          return `
          You are given the following API endpoints from an OpenAPI document:

          ${JSON.stringify(endpoints, null, 2)}

            Please generate a Flex scenario JSON file that includes:
        - A "scenarioConfig" object with specific fields:
          - "delay": A range between "0.5-1.5" in seconds.
          - "throttling": A realistic number like "50000".
          - "workers": Number of workers, e.g., "4".
          - "totalclients": A number, e.g., "10".
          - "duration": The duration in minutes, e.g., "5".
        - Each request should include:
          - "method": The HTTP method.
          - "path": The API path, with placeholders like "{id}" where necessary.
          - "port": Use "4000" as the default port.
          - "host": Use "localhost" as the default host.
          - "headers": Include "Content-Type: application/json".
          - "body": Realistic example data based on the request body schema.

          Ensure the generated JSON is syntactically correct, well-structured, and closely resembles the following example(read comments after some fields as well)):
          {
            "project": {
              "projectName": "aj", // from end points above, generate random but realistic data for this 
              "description": "aj", // from end points above, generate random but realistic data for this
              "_id": "acdd056c-ce1d-4129-9043-8c8eb18455cf" // from end points above, generate random but realistic data for this
            },
            "scenarios": [
              {
                "projectId": "acdd056c-ce1d-4129-9043-8c8eb18455cf", // use generated id
                "scenarioname": "Sample Scenario", // from end points above, generate random but realistic data for this
                "duration": "10",
                "workers": "4",
                "totalclients": "10",
                "throttling": "50000",
                "delay": "1.0",
                "_id": "2fb27015-d0bf-4fca-ab2a-9cbc1037872c"// from end points above, generate random but realistic data for this
              },
              {
                "projectId": "acdd056c-ce1d-4129-9043-8c8eb18455cf", // use generated id
                "scenarioname": "1",
                "duration": "5",
                "workers": "4",
                "totalclients": "10",
                "throttling": "40000",
                "delay": "0.5",
                "_id": "ba0323fb-a0f1-4c41-b573-cc92000a243f" // from end points above, generate random but realistic data for this
              }
            ],
            "requests": [
              {
                "scenarioId": "2fb27015-d0bf-4fca-ab2a-9cbc1037872c", // use generated id
                "requestName": "www.example.com", // from end points above, generate random but realistic data for this
                "url": "www.example.com/api", // from end points above, generate random but realistic data for this
                "protocol": "", // from end points above, generate random but realistic data for this
                "host": "www.example.com", // from end points above, generate random but realistic data for this
                "method": "GET", // from end points above, generate random but realistic data for this
                "path": "/", // from end points above, generate random but realistic data for this
                "port": "80", // from end points above, generate random but realistic data for this
                "body": [ // from end points above, generate random but realistic data for this
                  {
                    "key": "name ", // from end points above, generate random but realistic data for this
                    "value": "yujun", // from end points above, generate random but realistic data for this
                    "type": "TEXT", // from end points above, generate random but realistic data for this
                    "description": "" // from end points above, generate random but realistic data for this
                  },
                  {
                    "key": "email", // from end points above, generate random but realistic data for this
                    "value": "yujun150@gmail.com", // from end points above, generate random but realistic data for this
                    "type": "TEXT", // from end points above, generate random but realistic data for this
                    "description": "" // from end points above, generate random but realistic data for this
                  }
                ],
                "header": [
                  {
                    "key": "Content-Type", // from end points above, generate random but realistic data for this
                    "value": "application/json", // from end points above, generate random but realistic data for this
                    "description": "" // from end points above, generate random but realistic data for this
                  }
                ],
                "_id": "0bcecd91-12b7-48e9-b8d7-3b3fdd79af1d" // from end points above, generate random but realistic data for this
              },
              {
                "scenarioId": "ba0323fb-a0f1-4c41-b573-cc92000a243f", // from end points above, generate random but realistic data for this
                "requestName": "get", // from end points above, generate random but realistic data for this
                "url": "http://www.example.com/", // from end points above, generate random but realistic data for this
                "protocol": "http", // from end points above, generate random but realistic data for this
                "host": "www.example.com", // from end points above, generate random but realistic data for this
                "method": "GET", // from end points above, generate random but realistic data for this
                "path": "/", // from end points above, generate random but realistic data for this
                "port": "80", // from end points above, generate random but realistic data for this
                "body": [], // from end points above, generate random but realistic data for this
                "header": [], // from end points above, generate random but realistic data for this
                "_id": "29f48f2b-3696-4834-a7a8-cbd46535f536" // from end points above, generate random but realistic data for this
              }
            ]
          } and please remains the data integraty for generated json(aligh information)` ;
      }
  },

  // output settings
  outputDir: '../../temp',  // Directory to save the generated scenario
  outputFileName: 'flex-scenario-gpt.flex',  // Default output file name with .flex extension
};
