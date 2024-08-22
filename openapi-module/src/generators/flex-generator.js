const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeField, generateFakeData } = require('./field-mapping');
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

    if (config.consumer === 'server-app') {
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
        console.log(`Flex scenarios generated for server-app and saved to ${outputFilePath}`);
    } else if (config.consumer === 'desktop-app') {
        const projectId = faker.string.uuid();
        const project = {
            projectName: faker.company.name(),
            description: faker.company.catchPhrase(),
            _id: projectId
        };

        const scenarios = [
            {
                projectId: projectId,
                scenarioname: "Scenario " + faker.lorem.word(),
                duration: faker.number.int({ min: 5, max: 15 }).toString(),
                workers: "4",
                totalclients: "10",
                throttling: faker.number.int({ min: 40000, max: 60000 }).toString(),
                delay: faker.number.float({ min: 0.5, max: 1.5 }).toString(),
                _id: faker.string.uuid()
            }
        ];

        const requests = await Promise.all(endpoints.map(endpoint => createDesktopRequest(endpoint, scenarios[0]._id)));

        const desktopScenario = {
            project,
            scenarios,
            requests
        };

        fs.writeFileSync(outputFilePath, JSON.stringify(desktopScenario, null, 2));
        console.log(`Flex scenarios generated for desktop-app and saved to ${outputFilePath}`);
    } else {
        console.error(`Unknown consumer: ${config.consumer}`);
    }
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

async function createDesktopRequest(endpoint, scenarioId) {
    const request = {
        scenarioId,
        requestName: faker.commerce.productName() + " for " + endpoint.path,
        url: `http://localhost:${port}${endpoint.path}`,
        protocol: "http",
        host: "localhost",
        method: endpoint.method,
        path: endpoint.path,
        port: `${port}`,
        body: [],
        header: [
            {
                key: "Content-Type",
                value: "application/json",
                description: ""
            }
        ]
    };

    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        if (endpoint.requestBody && endpoint.requestBody.properties) {
            const body = await generateFakeData(endpoint.requestBody);
            request.body = Object.entries(body).map(([key, value]) => ({
                key,
                value: typeof value === 'object' ? JSON.stringify(value) : value,
                type: value.type ? value.type.toUpperCase() : "TEXT",
                description: ""
            }));
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