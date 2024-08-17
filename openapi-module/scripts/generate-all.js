const { generateCurlCommands } = require('../src/generators/curl-generator');
const { generateFlexScenarios } = require('../src/generators/flex-generator');
const args = process.argv.slice(2);

const openApiFilePathArg = args.find(arg => arg.startsWith('--openApiFilePath='));
const curlOutputFilePathArg = args.find(arg => arg.startsWith('--curlOutputFilePath='));
const flexOutputFilePathArg = args.find(arg => arg.startsWith('--flexOutputFilePath='));

if (!openApiFilePathArg || !curlOutputFilePathArg || !flexOutputFilePathArg) {
    console.error("Error: Missing required arguments. Please provide --openApiFilePath, --curlOutputFilePath, and --flexOutputFilePath.");
    process.exit(1);
}

const openApiFilePath = openApiFilePathArg.split('=')[1];
const curlOutputFilePath = curlOutputFilePathArg.split('=')[1];
const flexOutputFilePath = flexOutputFilePathArg.split('=')[1];

generateCurlCommands(openApiFilePath, curlOutputFilePath);

generateFlexScenarios(openApiFilePath, flexOutputFilePath);