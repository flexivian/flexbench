
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
├── temp/(generated files would be save under this folder)
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

### Before generate .flex file & curl-cmd for Flexbench by parsing your OpenAPI yaml:

Please decide to generate scenarios by AI or static approach:

Using static approach(Faker) - configurable template using faker to generate fake data for each schema and field

Go to GPT/config: set useGPT into false

Using AI approach(OpenAI API) - configurable template using GPT prompts to generate fake data for the .flex scenario

Go to GPT/config: 
1. set useGPT into true

## Setting Up the API Key

To securely use the API key in this project, it is recommended to set it as an environment variable. Follow the steps below to configure and use the API key:

### Step 1: Obtain Your API Key

If you don't already have an API key, you'll need to obtain one from the relevant service provider.

### Step 2: Set the API Key as an Environment Variable

**Linux/MacOS:**

   Open your terminal and run the following command to add the API key to your shell configuration file (e.g., `.bashrc`, `.bash_profile`, `.zshrc`):

  ```bash
   export OPENAI_API_KEY='your-api-key-here'
  ```
2. modify or customize your prompt for OpenAI model to generate personalized respond


### To parse an OpenAPI document and generate cURL commands:

Run the script to generate the cURL commands:

```sh
npm run generate-curl -- --openApiFilePath=sample/sample-openapi.yaml --outputFilePath=temp/curl-commands.sh
```

you can use your own openapi config file instead of sample-openapi.yml.

The generated cURL commands will be saved to `curl-commands.sh`.

### To parse an OpenAPI document and generate Flex scenarios:

Run the script to generate the Flex scenarios:

```sh
npm run generate-flex --  --openApiFilePath=sample/sample-openapi.yaml --outputFilePath=temp/flex-scenarios.json
```

you can use your own openapi config file instead of sample-openapi.yml.

The generated Flex scenarios will be saved in the `flex-scenarios` directory.

### To parse an OpenAPI document and generate both cURL commands and Flex scenarios:

Run the script to generate both the cURL commands and Flex scenarios:

```sh
npm run generate-all -- --openApiFilePath=sample/sample-openapi.yaml --curlOutputFilePath=temp/curl-commands.sh --flexOutputFilePath=temp/flex-scenarios.json
```

you can use your own openapi config file instead of sample-openapi.yml.

## To Use generated .flex and cURL: 

1. run prism to run the mock server

```
npm install -g @stoplight/prism-cli prism mock sample-openapi.yaml -p 4000
```
you can use your own openapi config file instead of sample-openapi.yml.

2. use the flex file through Flexbench desktop app and load and run it

## Testing

### To run tests:

```
npm test
```