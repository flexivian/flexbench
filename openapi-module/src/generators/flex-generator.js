const fs = require('fs');
const path = require('path');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeData } = require('./field-mapping');
const config = require('../GPT/config');
const port = 4000;

async function generateFlexScenarios(openApiFilePath, outputFilePath) {
    const endpoints = await parseOpenAPIDocument(openApiFilePath);

    if (!endpoints) {
        console.error('Failed to parse OpenAPI document.');
        return;
    }

    const outputDir = path.dirname(outputFilePath);
    ensureDirectoryExists(outputDir);

    const requests = await Promise.all(endpoints.map(endpoint => createFlexRequest(endpoint)));

    const scenarioConfig = {
        scenario: {
            delay: "0.5-1.5",
            throttling: "50000",
            workers: "4",
            totalclients: "10",
            duration: "5"
        },
        requests: requests
    };

    fs.writeFileSync(outputFilePath, JSON.stringify({ scenarioConfig }, null, 2));
    console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
}

async function createFlexRequest(endpoint) {
    const request = {
        method: endpoint.method,
        path: endpoint.path,
        port: `${port}`,
        host: "localhost",
        headers: {
            "Content-Type": "application/json"
        },
        body: {}
    };

    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        if (endpoint.requestBody && endpoint.requestBody.properties) {
            request.body = await generateFakeData(endpoint.requestBody);
        }
    }
    return request;
}

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    }
}

module.exports = {
    generateFlexScenarios
};