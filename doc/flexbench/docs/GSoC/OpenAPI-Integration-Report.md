## Introduction

This report explores how to parse OpenAPI (Swagger) documents using Node.js. The goal is to identify suitable libraries and methods to read and extract information from OpenAPI documents. 

## Swagger Parser for OpenAPI Document Parsing

### Swagger Parser

**Installation**:
```bash
npm install @apidevtools/swagger-parser
```

**Example Usage**:
```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');

async function parseOpenAPI() {
  const api = await SwaggerParser.validate('/openapi.yaml');
  console.log(api);
}

parseOpenAPI();
```


# Implementing a New Module for Flexbench to Read OpenAPI (Swagger) Documents and Create Test Scenarios


1. **Phase 1**: Generate a bash script with cURL commands using ML and Node.js.
2. **Phase 2**: Create ready-to-use `.flex` scenarios to be consumed by the Flexbench server and desktop app.

## Phase 1: Generating Bash Script with cURL Commands

### Step 1: Setup and Installation

Install the necessary libraries for parsing OpenAPI documents and generating test data.

```bash
npm install @apidevtools/swagger-parser faker axios
```

### Step 2: Module Implementation

Create a new module file, e.g., `openapi-curl-generator.js`.

```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');
const fs = require('fs');
const path = require('path');
const faker = require('faker'); // Library for generating fake data

async function generateCurlCommands(openApiFilePath, outputFilePath) {
    try {
        const api = await SwaggerParser.validate(openApiFilePath);
        const commands = [];

        for (const [pathKey, pathValue] of Object.entries(api.paths)) {
            for (const [method, operation] of Object.entries(pathValue)) {
                const command = createCurlCommand(pathKey, method, operation);
                commands.push(command);
            }
        }

        fs.writeFileSync(outputFilePath, commands.join('\n\n'));
        console.log(`cURL commands generated and saved to ${outputFilePath}`);
    } catch (err) {
        console.error(`Error generating cURL commands: ${err.message}`);
    }
}

function createCurlCommand(path, method, operation) {
    const url = `http://localhost:3000${path}`; 
    const headers = operation.parameters
        .filter(param => param.in === 'header')
        .map(param => `-H "${param.name}: ${faker.random.word()}"`).join(' ');
    const queryParams = operation.parameters
        .filter(param => param.in === 'query')
        .map(param => `${param.name}=${faker.random.word()}`).join('&');
    const bodyParams = operation.parameters
        .filter(param => param.in === 'body' && param.schema)
        .map(param => JSON.stringify(generateFakeData(param.schema))).join(' ');

    let command = `curl -X ${method.toUpperCase()} "${url}`;
    if (queryParams) {
        command += `?${queryParams}`;
    }
    command += `" ${headers}`;
    if (bodyParams) {
        command += ` -d '${bodyParams}'`;
    }

    return command;
}

function generateFakeData(schema) {
    const data = {};
    for (const [key, value] of Object.entries(schema.properties)) {
        if (value.type === 'string') {
            data[key] = faker.lorem.word();
        } else if (value.type === 'integer') {
            data[key] = faker.datatype.number();
        } else if (value.type === 'boolean') {
            data[key] = faker.datatype.boolean();
        }
    }
    return data;
}

module.exports = {
    generateCurlCommands
};
```

### Step 3: Example Usage

Create a script to use the new module, e.g., `generate-curl.js`.

```javascript
const { generateCurlCommands } = require('./openapi-curl-generator');

const openApiFilePath = '/openapi.yaml';
const outputFilePath = './curl-commands.sh'; 

generateCurlCommands(openApiFilePath, outputFilePath);
```

Run the script to generate the bash script with cURL commands.

```bash
node generate-curl.js
```

### Step 4: Publishing as an NPM Package

1. **Create a `package.json` file** if it doesn't exist.

   ```bash
   npm init -y
   ```

2. **Update `package.json`** to add a bin entry for the script.

   ```json
   {
     "name": "openapi-curl-generator",
     "version": "1.0.0",
     "description": "Generate bash script with curl commands from OpenAPI documents",
     "main": "openapi-curl-generator.js",
     "bin": {
       "generate-curl": "./generate-curl.js"
     },
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "author": "Your Name",
     "license": "ISC",
     "dependencies": {
       "@apidevtools/swagger-parser": "^10.0.2",
       "faker": "^5.5.3"
     }
   }
   ```

3. **Publish the package** to npm.

   ```bash
   npm publish
   ```

## Phase 2: Creating Ready-to-Use .flex Scenarios

### Step 1: Setup and Installation

Ensure you have the necessary libraries installed from Phase 1.

### Step 2: Module Implementation

Extend the existing module or create a new one, e.g., `openapi-flex-generator.js`.

```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');
const fs = require('fs');
const path = require('path');
const faker = require('faker');

async function generateFlexScenarios(openApiFilePath, outputDir) {
    try {
        const api = await SwaggerParser.validate(openApiFilePath);
        const scenarios = [];

        for (const [pathKey, pathValue] of Object.entries(api.paths)) {
            for (const [method, operation] of Object.entries(pathValue)) {
                const scenario = createFlexScenario(pathKey, method, operation);
                scenarios.push(scenario);
            }
        }

        const outputFilePath = path.join(outputDir, 'scenarios.flex');
        fs.writeFileSync(outputFilePath, JSON.stringify(scenarios, null, 2));
        console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
    } catch (err) {
        console.error(`Error generating flex scenarios: ${err.message}`);
    }
}

function createFlexScenario(path, method, operation) {
    return {
        path,
        method,
        summary: operation.summary || '',
        description: operation.description || '',
        parameters: operation.parameters || [],
        responses: operation.responses || {}
    };
}

module.exports = {
    generateFlexScenarios
};
```

### Step 3: Example Usage

Create a script to use the new module, e.g., `generate-flex.js`.

```javascript
const { generateFlexScenarios } = require('./openapi-flex-generator');

const openApiFilePath = '/openapi.yaml'; 
const outputDir = './flex-scenarios'; 

generateFlexScenarios(openApiFilePath, outputDir);
```

Run the script to generate the .flex scenarios.

```bash
node generate-flex.js
```

## Integration with Flexbench

Modify Flexbench to read and execute the generated `.flex` scenarios. This involves updating the Flexbench test runner to parse the `.flex` files and execute the scenarios accordingly.

## Documentation

Update the Flexbench documentation to include details about the new module.


## Summary of Findings and Recommended Approach

Based on the research, the following libraries are recommended for parsing OpenAPI documents in Node.js:

- **Swagger Parser**: Ideal for validating, parsing, and dereferencing OpenAPI documents. It is simple to use and handles `$ref` resolution efficiently.

**Recommended Approach**:
For the Flexbench project, **Swagger Parser** is recommended due to its simplicity and efficiency in parsing and validating OpenAPI documents. It will help in ensuring that the OpenAPI documents are correctly formatted and fully dereferenced.

## Conclusion

This report provides an overview of available Node.js libraries for parsing OpenAPI documents and recommends using Swagger Parser for the Flexbench project due to its robust features and ease of use.