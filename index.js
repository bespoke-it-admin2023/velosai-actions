// api/openai.js
const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method Not Allowed' });
    }

    const userInput = req.body.prompt;

    if (!userInput) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini', // or use 'gpt-4' if you have access
            messages: [{ role: 'user', content: userInput }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Send back the response data from OpenAI
        res.json(response.data);
    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        res.status(500).send({ error: 'Error communicating with OpenAI API' });
    }
};