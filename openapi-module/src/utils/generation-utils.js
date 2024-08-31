const { generateCurlCommands } = require('../generators/curl-generator');
const { generateFlexScenariosWithGPT } = require('../generators/gpt-flex-generator');
const { generateFlexScenarios } = require('../generators/flex-generator');
const config = require('../GPT/config');

function parseArguments(args) {
    const openApiFilePathArg = args.find(arg => arg.startsWith('--openApiFilePath='));
    const curlOutputFilePathArg = args.find(arg => arg.startsWith('--curlOutputFilePath='));
    const flexOutputFilePathArg = args.find(arg => arg.startsWith('--flexOutputFilePath='));
    const useGPTArg = args.find(arg => arg.startsWith('--useGPT='));
    const gptOutputFilenameArg = args.find(arg => arg.startsWith('--gptOutputFilename='));

    return {
        openApiFilePath: openApiFilePathArg ? openApiFilePathArg.split('=')[1] : null,
        curlOutputFilePath: curlOutputFilePathArg ? curlOutputFilePathArg.split('=')[1] : null,
        flexOutputFilePath: flexOutputFilePathArg ? flexOutputFilePathArg.split('=')[1] : null,
        useGPT: useGPTArg ? useGPTArg.split('=')[1].toLowerCase() === 'true' : config.useGPT,
        gptOutputFilename: gptOutputFilenameArg ? gptOutputFilenameArg.split('=')[1] : config.outputFileName,
    };
}

function generateFiles(options) {
    if (options.useGPT) {
        config.useGPT = true;
        config.outputFileName = options.gptOutputFilename;
    }

    if (options.curlOutputFilePath) {
        generateCurlCommands(options.openApiFilePath, options.curlOutputFilePath);
    }

    if (options.flexOutputFilePath) {
        if (config.useGPT) {
            generateFlexScenariosWithGPT(options.openApiFilePath, options.flexOutputFilePath)
                .then(() => console.log('Flex scenario generation with GPT complete.'))
                .catch(error => console.error('Error during Flex scenario generation with GPT:', error));
        } else {
            generateFlexScenarios(options.openApiFilePath, options.flexOutputFilePath)
                .then(() => console.log('Flex scenario generation complete.'))
                .catch(error => console.error('Error during Flex scenario generation:', error));
        }
    }
}

module.exports = {
    parseArguments,
    generateFiles,
};