const axios = require('axios');

const API_KEY = 'OiQUTzmGEqxw7UkDmcBvYAQLVFDSdxI466KyGNGOM5XOUNbtqX4B08F2JpXGMnOY';
const BASE_URL = 'https://api-lr.agent.ai/v1/action';

async function invokeLLM(prompt) {
    try {
        const response = await axios.post(`${BASE_URL}/invoke_llm`, {
            instructions: prompt,
            llm_engine: 'gpt4o',
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data.response;
    } catch (err) {
        console.error("LLM Error:", err.response?.data || err.message);
        return "🧙‍♂️ The spell failed! Check your incantation.";
    }
}

async function invokeAgent(agentId, userInput) {
    try {
        const response = await axios.post(`${BASE_URL}/invoke_agent`, {
            id: agentId,
            user_input: userInput,
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data.response;
    } catch (err) {
        console.error("Agent Error:", err.response?.data || err.message);
        return "🧙‍♂️ This agent didn't respond. Perhaps it's taking a nap.";
    }
}

module.exports = { invokeLLM, invokeAgent };
