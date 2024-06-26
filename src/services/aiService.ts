import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function analyzeEmailContent(content: string) {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Analyze the following email content and assign a label (Interested, Not Interested, More information):\n\n${content}`,
        max_tokens: 50,
    });

    return response.data.choices[0].text.trim();
}

export async function generateEmailReply(content: string) {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Based on the following email content, generate a reply:\n\n${content}`,
        max_tokens: 100,
    });

    return response.data.choices[0].text.trim();
}
