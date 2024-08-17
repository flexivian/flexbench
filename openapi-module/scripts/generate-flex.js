const { generateFlexScenarios } = require('../src/generators/flex-generator');
const args = process.argv.slice(2);

const openApiFilePathArg = args.find(arg => arg.startsWith('--openApiFilePath='));
const outputFilePathArg = args.find(arg => arg.startsWith('--outputFilePath='));

if (!openApiFilePathArg || !outputFilePathArg) {
    console.error("Error: Missing required arguments. Please provide --openApiFilePath and --outputFilePath.");
    process.exit(1);
}

const openApiFilePath = openApiFilePathArg.split('=')[1];
const outputFilePath = outputFilePathArg.split('=')[1];

generateFlexScenarios(openApiFilePath, outputFilePath);