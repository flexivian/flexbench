const fs = require('fs');
const path = require('path');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeField, generateFakeData } = require('./field-mapping');
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
            console.log(`Generating data for POST body with schema: ${JSON.stringify(endpoint.requestBody.properties, null, 2)}`);
            request.body = await generateFakeData(endpoint.requestBody);
            console.log(`Generated POST body: ${JSON.stringify(request.body, null, 2)}`);
        } else {
            console.log('No schema found for POST request body.');
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