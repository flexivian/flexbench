const { generateCurlCommands } = require('../src/generators/curl-generator');

const openApiFilePath = '../sample/sample-openapi.yaml'; 
const outputFilePath = '../curl-commands.sh'; 

generateCurlCommands(openApiFilePath, outputFilePath);