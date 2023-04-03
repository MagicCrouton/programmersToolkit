require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai');

console.log(process.env.API_KEY)
const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration);

const ping = async () => {
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });

console.log(response.data.choices.text)
}

ping()