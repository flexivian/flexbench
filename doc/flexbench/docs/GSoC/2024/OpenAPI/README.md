
# OpenAPI

## Overview

This module provides functionalities to parse OpenAPI documents and generate test scenarios for Flexbench.

## File Involved

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

**Features**:
- Parse, validate, and dereference JSON/YAML schemas.
- Resolve references (`$ref`) and bundle schemas.
- Generate realisitc data based on parsed OpenAPI endpoints by using ML/Static approach

## Installation

### To install dependencies, run the following command:

```sh
npm install
```

## Usage

### To parse an OpenAPI document and generate cURL commands:

Run the script to generate the cURL commands:

```sh
npm run generate-curl --openApiFilePath=openapi-module/sample/'modify this to your OpenAPI file'.yaml --outputFilePath=openapi-module/temp/curl-commands.sh
```

The generated cURL commands will be saved to `curl-commands.sh`.

### To parse an OpenAPI document and generate Flex scenarios:

Run the script to generate the Flex scenarios:

```sh
npm run generate-flex --openApiFilePath=openapi-module/sample/'modify this to your OpenAPI file'.yaml --outputFilePath=openapi-module/temp/flex-scenarios.json
```


The generated Flex scenarios will be saved in the `flex-scenarios` directory.

### To parse an OpenAPI document and generate both Flex scenarios and Curl-commands:

Run the script to generate the Flex scenarios and Curl Commands:

```sh
npm run generate-all --openApiFilePath=openapi-module/sample/'modify this to your OpenAPI file'.yaml
```

## Testing

### To run tests:

```
cd openapi-module/test
```

```
node placeholder.test.js
```