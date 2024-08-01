const SwaggerParser = require('@apidevtools/swagger-parser');

async function parseOpenAPIDocument(openApiFilePath) {
    try {
        const api = await SwaggerParser.validate(openApiFilePath);
        const endpoints = [];

        for (const [pathKey, pathValue] of Object.entries(api.paths)) {
            for (const [method, operation] of Object.entries(pathValue)) {
                const endpoint = {
                    path: pathKey,
                    method: method.toUpperCase(),
                    summary: operation.summary || '',
                    description: operation.description || '',
                    parameters: operation.parameters || [],
                    requestBody: operation.requestBody || null,
                    responses: operation.responses || null
                };
                endpoints.push(endpoint);
            }
        }

        return endpoints;
    } catch (err) {
        console.error(`Error parsing OpenAPI document: ${err.message}`);
        return null;
    }
}

module.exports = {
    parseOpenAPIDocument
};