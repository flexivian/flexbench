module.exports = {
  useGPT: false,  // Set this to true to use GPT for generating scenarios
  openaiApiKey: process.env.OPENAI_API_KEY,

  // Settings
  model: "gpt-3.5-turbo",  // Default model, use the best model for JSON responses
  maxTokens: 1500,  // Maximum tokens for the completion
  temperature: 0.7,  // Control the creativity of the response

  // Prompt template for generating scenarios
  promptTemplate: function(endpoints) {
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
      }`;
  },

  // Output settings
  outputDir: '../../temp',
  outputFileName: 'flex-scenario.flex',  
  curlOutputFileName: 'curl-commands.sh',
};