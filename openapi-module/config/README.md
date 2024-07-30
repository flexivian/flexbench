
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
│   ├── .gitignore
│   └── README.md
├── src/
│   ├── parsers/
│   │   └── openapi-parser.js
│   ├── generators/
│   │   ├── curl-generator.js
│   │   └── flex-generator.js
├── scripts/
│   ├── generate-curl.js
│   └── generate-flex.js
└── test/
    └── placeholder.test.js
package.json
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
const openApiFilePath = 'openapi-module/sample/openapi.yaml'; 
const outputFilePath = './curl-commands.sh'; 
```

3. Run the script to generate the cURL commands:

```sh
node scripts/generate-curl.js
```

The generated cURL commands will be saved to `curl-commands.sh`.

### To parse an OpenAPI document and generate Flex scenarios:

1. Place your OpenAPI document (e.g., `openapi.yaml`) under the 'openapi-module/sample'.
2. Update the file path in `scripts/generate-flex.js`.

```javascript
const openApiFilePath = 'openapi-module/sample/openapi.yaml'; 
const outputDir = './flex-scenarios';
```

3. Run the script to generate the Flex scenarios:

```sh
node scripts/generate-flex.js
```

The generated Flex scenarios will be saved in the `flex-scenarios` directory.


## Testing

### To run tests:

```
cd openapi-module/test
```

```
node placeholder.test.js
```