module.exports = {
    useGPT: false,  // set this to true to use GPT for generating scenarios
    openaiApiKey: process.env.OPENAI_API_KEY,

    // settings
    model: "gpt-3.5-turbo",  // default model, please use the best model for JSON res as possible
    maxTokens: 1500,  // maximum tokens for the completion
    temperature: 0.7,  // control the creativity of the response

    // prompt template for generating scenarios
    promptTemplate: (endpoints) => `
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
          - "port": Use "3000" as the default port.
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
                "port": "3000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {}
              },
              {
                "method": "POST",
                "path": "/users",
                "port": "3000",
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
                "port": "3000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {}
              }
            ]
          }
        }`,

    // output settings
    outputDir: '../../temp',  // Directory to save the generated scenario
    outputFileName: 'flex-scenario-gpt.json',  // Default output file name
};