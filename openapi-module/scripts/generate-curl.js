const { generateCurlCommands } = require('../src/generators/curl-generator');
const args = process.argv.slice(2);

const openApiFilePath = args.find(arg => arg.startsWith('--openApiFilePath=')).split('=')[1];
const outputFilePath = args.find(arg => arg.startsWith('--outputFilePath=')).split('=')[1];

generateCurlCommands(openApiFilePath, outputFilePath);