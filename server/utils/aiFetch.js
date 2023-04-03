require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration);

const aiFetch = async () => {
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "make a basic html header",
    max_tokens: 100,
    temperature: .5,
  });

// console.log(response.data.choices[0].text)
}

module.exports= {aiFetch}