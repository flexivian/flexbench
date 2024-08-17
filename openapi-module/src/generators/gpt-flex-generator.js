const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const config = require('../GPT/Config');

async function generateFlexScenariosWithGPT(openApiFilePath, outputFilePath) {
    const openApiData = await parseOpenApiFile(openApiFilePath);

    if (!openApiData) {
        console.error('Failed to parse OpenAPI document.');
        return;
    }

    const prompt = createPromptFromOpenApi(openApiData);

    const flexScenario = await generateScenarioFromGPT(prompt);

    if (flexScenario) {
        try {
            fs.writeFileSync(outputFilePath, JSON.stringify(flexScenario, null, 2));
            console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
        } catch (error) {
            console.error('Failed to write Flex scenarios to file:', error);
        }
    } else {
        console.error('Failed to generate Flex scenarios using GPT.');
    }
}

async function parseOpenApiFile(openApiFilePath) {
    try {
        const openApiDocument = fs.readFileSync(openApiFilePath, 'utf-8');
        return JSON.parse(openApiDocument);
    } catch (error) {
        console.error('Failed to read or parse the OpenAPI file:', error);
        return null;
    }
}

function createPromptFromOpenApi(openApiData) {
    const endpoints = Object.entries(openApiData.paths).map(([path, methods]) => {
        return Object.entries(methods).map(([method, details]) => {
            return {
                method: method.toUpperCase(),
                path: path,
                summary: details.summary || 'No summary available',
                parameters: details.parameters || [],
                requestBody: details.requestBody ? details.requestBody.content['application/json'].schema : null
            };
        });
    }).flat();

    // customize the prompt according to your needs
    const prompt = `
    Based on the following API endpoints, generate a Flex scenario JSON file:
    
    ${JSON.stringify(endpoints, null, 2)}
    
    The Flex scenario JSON should include appropriate delay, throttling, workers, total clients, duration, method, path, headers, and realistic body data for POST/PUT requests.
    `;

    return prompt;
}

async function generateScenarioFromGPT(prompt) {
    const configuration = new Configuration({
        apiKey: config.openaiApiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1500,  // Adjust based on the expected size of the response
            temperature: 0.7,
        });

        const gptOutput = response.data.choices[0].text.trim();

        // Attempt to parse the JSON output from GPT
        try {
            return JSON.parse(gptOutput);
        } catch (parseError) {
            console.error('Failed to parse GPT response into JSON:', parseError);
            console.log('GPT Output:', gptOutput);
            return null;
        }
    } catch (error) {
        console.error('Failed to generate scenario with GPT:', error);
        return null;
    }
}

module.exports = {
    generateFlexScenariosWithGPT
};