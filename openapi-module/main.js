const { execSync } = require('child_process');

function runScript(script) {
    try {
        execSync(script, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing script: ${script}`, error);
    }
}

const openApiFilePath = args.find(arg => arg.startsWith('--openApiFilePath=')).split('=')[1];
const curlOutputFilePath = './temp/curl.commands.sh';
const flexOutputFilePath = './temp/flex-scenarios.json';


runScript(`npm run generate-curl -- --openApiFilePath=${openApiFilePath} --outputFilePath=${curlOutputFilePath}`);
runScript(`npm run generate-flex -- --openApiFilePath=${openApiFilePath} --outputFilePath=${flexOutputFilePath}`);