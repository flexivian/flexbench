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

    const projectId = await generateFakeField('uuid', { format: 'uuid' });

    const scenarios = [
        {
            projectId: projectId,
            scenarioname: "Generated Scenario",
            duration: "10",
            workers: "4",
            totalclients: "10",
            throttling: "50000",
            delay: "1.0",
            _id: await generateFakeField('uuid', { format: 'uuid' }) 
        }
    ];

    const requests = await Promise.all(endpoints.map((endpoint, index) => 
        createFlexRequest(endpoint, scenarios[0]._id, index + 1)
    ));

    const scenarioConfig = {
        project: {
            projectName: "Generated Project",
            description: "A project generated from OpenAPI document",
            _id: projectId 
        },
        scenarios: scenarios,
        requests: requests
    };

    fs.writeFileSync(outputFilePath, JSON.stringify(scenarioConfig, null, 2));
    console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
}

async function createFlexRequest(endpoint, scenarioId, requestIndex) {
    const request = {
        scenarioId: scenarioId, 
        requestName: `Request ${requestIndex}`,
        url: `http://localhost:${port}${endpoint.path}`,
        protocol: "http",
        host: "localhost",
        method: endpoint.method,
        path: endpoint.path,
        port: `${port}`,
        body: {},
        header: [],
        _id: await generateFakeField('uuid', { format: 'uuid' })
    };

    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        if (endpoint.requestBody && endpoint.requestBody.properties) {
            request.body = await generateFakeData(endpoint.requestBody);
        }
    }

    if (endpoint.headers) {
        request.header = Object.keys(endpoint.headers).map(key => ({
            key: key,
            value: endpoint.headers[key],
            description: ""
        }));
    } else {
        request.header.push({
            key: "Content-Type",
            value: "application/json",
            description: ""
        });
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