const { parseArguments, generateFiles } = require('../src/utils/generation-utils');

const options = parseArguments(process.argv.slice(2));

if (!options.openApiFilePath || !options.flexOutputFilePath) {
    console.error("Error: Missing required arguments. Please provide --openApiFilePath and --flexOutputFilePath.");
    process.exit(1);
}

generateFiles(options);