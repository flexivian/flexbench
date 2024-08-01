
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
├── config/
│   ├── openapi-config.json
│   └── .gitignore
├── sample/
│   ├── mock-server.js
│   └── sample-openapi.yaml
├── scripts/
│   ├── generate-curl.js
│   └── generate-flex.js
├── src/
│   ├── generators/
│   │   ├── curl-generator.js
│   │   ├── fake-data.js
│   │   └── flex-generator.js
│   └── parsers/
│       └── openapi-parser.js
├── temp/
│   ├── curl-commands.sh
│   └── flex-scenarios.flex
└── test/
    └── placeholder.test.js
package-lock.json
package.json
README.md
```

## Installation

### To install dependencies, run the following command:

```sh
npm install
```

## Usage

### To parse an OpenAPI document and generate cURL commands:

1. Place your OpenAPI document (e.g., `openapi.yaml`) under the 'openapi-module/sample'.
2. Update the file path in `scripts/generate-curl.js`.

```javascript
const openApiFilePath = 'openapi-module/sample/sample-openapi.yaml'; 
const outputFilePath = './temp/curl-commands.sh'; 
```

3. Run the script to generate the cURL commands:

```sh
npm run generate-curl -- --openApiFilePath=openapi-module/sample/'modify this to your OpenAPI file'.yaml --outputFilePath=openapi-module/temp/curl-commands.sh
```

The generated cURL commands will be saved to `curl-commands.sh`.

### To parse an OpenAPI document and generate Flex scenarios:

1. Place your OpenAPI document (e.g., `openapi.yaml`) under the 'openapi-module/sample'.
2. Update the file path in `scripts/generate-flex.js`.

```javascript
const openApiFilePath = 'openapi-module/sample/sample-openapi.yaml'; 
const outputDir = './temp/flex-scenarios';
```

3. Run the script to generate the Flex scenarios:

```sh
npm run generate-flex -- --openApiFilePath=openapi-module/sample/'modify this to your OpenAPI file'.yaml --outputFilePath=openapi-module/temp/flex-scenarios.json
```


The generated Flex scenarios will be saved in the `flex-scenarios` directory.

### To parse an OpenAPI document and generate both Flex scenarios and Curl-commands:
1. Place your OpenAPI document (e.g., `openapi.yaml`) under the 'openapi-module/sample'.
2. Update the file path in `main.js`.

```javascript
const openApiFilePath = './sample/modifythis.yaml'; 
```

3. Run the script to generate the Flex scenarios and Curl Commands:

```sh
npm run generate-all
```

## Testing

### To run tests:

```
cd openapi-module/test
```

```
node placeholder.test.js
```