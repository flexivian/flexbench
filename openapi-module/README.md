# OpenAPI Module for Flexbench

This module provides functionalities to parse OpenAPI documents and generate test scenarios for Flexbench.

## Prerequisites

- To use this module, you need to install Node.js. It is recommended to use the latest LTS version available.
  Please install Node.js using pre-built installers for your platform to avoid incompatibility issues with different development tools.

### To check that Node.js was installed correctly, type the following commands in your terminal client:

```sh
node -v
npm -v
```

## Project Structure

```
openapi-module/
├── node_modules/
├── sample/
│   └── sample-openapi.yaml
├── scripts/
│   ├── generate-all.js
│   ├── generate-curl.js
│   └── generate-flex.js
├── src/
│   ├── generators/
│   │   ├── curl-generator.js
│   │   ├── field-mapping.js
│   │   ├── flex-generator.js
│   │   └── gpt-flex-generator.js
│   ├── GPT/
│   │   └── config.js
│   └── parsers/
│       └── openapi-parser.js
├── temp/(generated files will be saved under this folder)
├── test/
│   ├── generators.test.js
│   └── parser.test.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Installation

### To install dependencies, run the following command:

```sh
npm install
```

## Usage

### Before generating .flex files & cURL commands for Flexbench by parsing your OpenAPI YAML file:

You need to decide whether to generate scenarios using AI or a static approach:

#### Using the Static Approach (Faker)

1. This approach uses configurable templates with Faker to generate fake data for each schema and field.
2. To use this method, go to `src/GPT/config.js` and set `useGPT` to `false`.

#### Using the AI Approach (OpenAI API)

1. This approach uses configurable templates with GPT prompts to generate fake data for the .flex scenarios.
2. To use this method, go to `src/GPT/config.js` and set `useGPT` to `true`.
3. Modify or customize your prompt for the OpenAI model to generate personalized responses.
4. Setting Up the API Key: To securely use the API key in this project, it is recommended to set it as an environment variable. Follow the steps below:
5. Obtain Your API Key: If you don't already have an API key, obtain one from the relevant service provider.
6. Set the API Key as an Environment Variable

**Linux/MacOS:**

   Open your terminal and run the following command to add the API key to your shell configuration file (e.g., `.bashrc`, `.bash_profile`, `.zshrc`):

  ```bash
   export OPENAI_API_KEY='your-api-key-here'
  ```

7. Setting Up the Consumer for Generated Files: Go to `src/GPT/config.js` and set the `consumer` value to either `'desktop-app'` or `'server-app'`:

- **'desktop-app'**: Generates a desktop app consumable format JSON .flex file that you can import and run.
- **'server-app'**: Generates a server app consumable format JSON .flex file, which you need to open and copy the JSON over to Postman for server-app testing.

8. Run scripts

## Running the Scripts

### To Parse an OpenAPI Document and Generate cURL Commands:

Run the following script to generate the cURL commands:

```sh
npm run generate-curl -- --openApiFilePath=sample/sample-openapi.yaml --outputFilePath=temp/curl-commands.sh
```

You can use your own OpenAPI YAML file instead of `sample-openapi.yaml`.

The generated cURL commands will be saved to `curl-commands.sh`.

### To Parse an OpenAPI Document and Generate Flex Scenarios:

Run the following script to generate the Flex scenarios:

```sh
npm run generate-flex -- --openApiFilePath=sample/sample-openapi.yaml --outputFilePath=temp/flex-scenarios.json
```

You can use your own OpenAPI YAML file instead of `sample-openapi.yaml`.

The generated Flex scenarios will be saved in the `temp` directory.

### To Parse an OpenAPI Document and Generate Both cURL Commands and Flex Scenarios:

Run the following script to generate both the cURL commands and Flex scenarios:

```sh
npm run generate-all -- --openApiFilePath=sample/sample-openapi.yaml --curlOutputFilePath=temp/curl-commands.sh --flexOutputFilePath=temp/flex-scenarios.json
```

You can use your own OpenAPI YAML file instead of `sample-openapi.yaml`.

## Customizing Script Execution

### Setting the Use of GPT and Output Filename via Command Line

You can also control whether to use GPT and specify the output filename directly from the command line:

```sh
npm run generate-flex -- --openApiFilePath=sample/sample-openapi.yaml --outputFilePath=temp/flex-scenarios.json --useGPT=true --gptOutputFilename=my-custom-scenario.flex
```

## To Use Generated .flex and cURL Files:

1. Run Prism to start the mock server:

```sh
npm install -g @stoplight/prism-cli 
```

```sh
prism mock sample-openapi.yaml -p 4000
```

You can use your own OpenAPI YAML file instead of `sample-openapi.yaml`.

2. Use the generated .flex file with the Flexbench desktop app, load it, and run it.

## Testing

### To run tests:

```sh
npm test
```