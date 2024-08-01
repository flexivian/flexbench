const fs = require('fs');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeData } = require('./fake-data');

async function generateFlexScenarios(openApiFilePath, outputFilePath) {
    const endpoints = await parseOpenAPIDocument(openApiFilePath);

    if (!endpoints) {
        console.error('Failed to parse OpenAPI document.');
        return;
    }

    const scenarioConfig = {
        scenario: {
            delay: "0.5-1.5",
            throttling: "50000",
            workers: "4",
            totalclients: "10",
            duration: "5"
        },
        requests: endpoints.map(endpoint => createFlexRequest(endpoint))
    };

    fs.writeFileSync(outputFilePath, JSON.stringify({ scenarioConfig }, null, 2));
    console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
}

function createFlexRequest(endpoint) {
    const request = {
        method: endpoint.method,
        path: endpoint.path,
        port: "3000", 
        host: "localhost",
        headers: {
            "Content-Type": "application/json"
        },
        body: {}
    };

    if (endpoint.method === 'POST' || endpoint.method === 'PUT' || endpoint.method === 'PATCH') {
        if (endpoint.requestBody && endpoint.requestBody.content['application/json']) {
            request.body = generateFakeData(endpoint.requestBody.content['application/json'].schema);
        }
    }

    return request;
}

module.exports = {
    generateFlexScenarios
};