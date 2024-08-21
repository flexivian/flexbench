const fs = require('fs');
const path = require('path');
const { generateFlexScenariosWithGPT } = require('../src/generators/gpt-flex-generator');
const { generateFlexScenarios } = require('../src/generators/flex-generator');
const { generateCurlCommands } = require('../src/generators/curl-generator');
const config = require('../src/GPT/config');

async function testStaticFlexGenerator() {
    const openApiFilePath = path.resolve(__dirname, '../sample/sample-openapi.yaml');
    const outputFilePath = path.resolve(__dirname, '../temp/flex-scenarios.json');

    console.log("Testing Static Flex Generator...");

    try {
        await generateFlexScenarios(openApiFilePath, outputFilePath);
        const outputData = fs.readFileSync(outputFilePath, 'utf-8');
        const jsonData = JSON.parse(outputData);

        if (jsonData.scenarioConfig && jsonData.scenarioConfig.requests.length > 0) {
            console.log("Static Flex Generator Test Passed");
        } else {
            console.error("Static Flex Generator Test Failed: Invalid scenarioConfig");
        }
    } catch (error) {
        console.error("Static Flex Generator Test Failed:", error);
    }
}

async function testGPTFlexGenerator() {
    const openApiFilePath = path.resolve(__dirname, '../sample/sample-openapi.yaml');
    const outputFilePath = path.resolve(__dirname, '../temp/flex-scenario-gpt.json');

    console.log("Testing GPT Flex Generator...");

    try {
        await generateFlexScenariosWithGPT(openApiFilePath, outputFilePath);
        const outputData = fs.readFileSync(outputFilePath, 'utf-8');
        const jsonData = JSON.parse(outputData);

        if (jsonData.scenarioConfig && jsonData.scenarioConfig.requests.length > 0) {
            console.log("GPT Flex Generator Test Passed");
        } else {
            console.error("GPT Flex Generator Test Failed: Invalid scenarioConfig");
        }
    } catch (error) {
        console.error("GPT Flex Generator Test Failed:", error);
    }
}

async function testCurlCommandGenerator() {
    const openApiFilePath = path.resolve(__dirname, '../sample/sample-openapi.yaml');
    const outputFilePath = path.resolve(__dirname, '../temp/curl-commands.sh');

    console.log("Testing cURL Command Generator...");

    try {
        await generateCurlCommands(openApiFilePath, outputFilePath);
        const outputData = fs.readFileSync(outputFilePath, 'utf-8');

        console.log("Generated cURL commands:");
        console.log(outputData);

        if (outputData.includes('curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d')) {
            console.log("cURL Command Generator Test Passed");
        } else {
            console.error("cURL Command Generator Test Failed: Incorrect cURL command generated");
        }
    } catch (error) {
        console.error("cURL Command Generator Test Failed:", error);
    }
}

async function runTests() {
    if (!config.useGPT) {
        console.log("Running tests with static data generation...");
        await testStaticFlexGenerator();
    } else {
        console.log("Running tests with both static and GPT-based data generation...");
        await testStaticFlexGenerator();
        await testGPTFlexGenerator();
    }

    console.log("Running cURL Command Generator test...");
    await testCurlCommandGenerator();
}

runTests();