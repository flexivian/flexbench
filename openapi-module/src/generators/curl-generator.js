const fs = require('fs');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeField, generateFakeData } = require('./fake-data');

async function generateCurlCommands(openApiFilePath, outputFilePath) {
    const endpoints = await parseOpenAPIDocument(openApiFilePath);

    if (!endpoints) {
        console.error('Failed to parse OpenAPI document.');
        return;
    }

    const commands = endpoints.map(endpoint => createCurlCommand(endpoint)).join('\n\n');
    fs.writeFileSync(outputFilePath, commands);
    console.log(`cURL commands generated and saved to ${outputFilePath}`);
}

function createCurlCommand(endpoint) {
    let url = `http://localhost:3000${endpoint.path.replace(/{(.*?)}/g, (_, key) => `\${${key}}`)}`;
    const method = endpoint.method;
    const headers = [];
    const params = [];
    let data = '';

    endpoint.parameters.forEach(param => {
        if (param.in === 'query') {
            params.push(`${param.name}=${generateFakeField(param.name, param.schema)}`);
        } else if (param.in === 'header') {
            headers.push(`-H "${param.name}: ${generateFakeField(param.name, param.schema)}"`);
        } else if (param.in === 'path') {
            url = url.replace(`\${${param.name}}`, generateFakeField(param.name, param.schema));
        }
    });

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        if (endpoint.requestBody && endpoint.requestBody.content['application/json']) {
            data = `-d '${JSON.stringify(generateFakeData(endpoint.requestBody.content['application/json'].schema))}'`;
        }
    }

    const queryString = params.length ? `?${params.join('&')}` : '';
    return `curl -X ${method} "${url}${queryString}" ${headers.join(' ')} ${data}`.trim();
}


module.exports = {
    generateCurlCommands
};