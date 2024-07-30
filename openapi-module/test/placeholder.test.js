const { parseOpenAPIDocument } = require('../src/parsers/openapi-parser');

async function testParser() {
    const openApiFilePath = '../sample/sample-openapi.yaml'; 

    const endpoints = await parseOpenAPIDocument(openApiFilePath);

    if (endpoints) {
        console.log('Parsed Endpoints:');
        endpoints.forEach(endpoint => {
            console.log(`Path: ${endpoint.path}`);
            console.log(`Method: ${endpoint.method}`);
            console.log(`Summary: ${endpoint.summary}`);
            console.log(`Description: ${endpoint.description}`);
            console.log('Parameters:');
            endpoint.parameters.forEach(param => {
                console.log(`  - Name: ${param.name}`);
                console.log(`    In: ${param.in}`);
                console.log(`    Required: ${param.required}`);
                console.log(`    Schema: ${JSON.stringify(param.schema)}`);
            });
            console.log('-------------------------');
        });
    }
}

testParser();