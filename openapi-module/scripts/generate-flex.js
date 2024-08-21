const path = require('path');
const { generateFlexScenariosWithGPT } = require('../src/generators/gpt-flex-generator');
const { generateFlexScenarios } = require('../src/generators/flex-generator');
const config = require('../src/GPT/config'); 
const args = process.argv.slice(2);

const openApiFilePathArg = args.find(arg => arg.startsWith('--openApiFilePath='));
const outputFilePathArg = args.find(arg => arg.startsWith('--outputFilePath='));

if (!openApiFilePathArg || !outputFilePathArg) {
    console.error("Error: Missing required arguments. Please provide --openApiFilePath and --outputFilePath.");
    process.exit(1);
}

const openApiFilePath = openApiFilePathArg.split('=')[1];
const outputFilePath = outputFilePathArg.split('=')[1];

if (config.useGPT) {
    generateFlexScenariosWithGPT(openApiFilePath, outputFilePath)
        .then(() => {
            console.log('Flex scenario generation with GPT complete.');
        })
        .catch((error) => {
            console.error('Error during Flex scenario generation with GPT:', error);
        });
} else {
    generateFlexScenarios(openApiFilePath, outputFilePath)
        .then(() => {
            console.log('Flex scenario generation complete.');
        })
        .catch((error) => {
            console.error('Error during Flex scenario generation:', error);
        });
}