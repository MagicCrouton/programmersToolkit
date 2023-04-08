require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration);

const newCode = async (payload) => {
 try {
    console.log("payload", payload)
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `${payload}`}],
  });

//   console.log(response.data)
  let data = response.data.choices[0].message.content
  return data
 } catch(err) {
    console.log(err);
    // return;
 }
  // console.log(response.data.choices[0].message.content)
}

const editCode = async (target, payload) => {
    const response = await openai.createEdit({
        model: "code-davinci-edit-001",
        input: `${target}`,
        instruction: `${payload}`,
      });
return (response.data.choices[0].text)
// console.log(response.data.choices[0].text)
}

// const test = async () => {
//     let temp = await newCode('make a basic html site with header "i love coding"')
//     let temp2 = await editCode(temp, "put a cute picture of a dog on this page")
//     console.log(temp2)
// }

// test()

// const newnew = async () => {
//   let temp = await newCode('make me a simple python script to talk to a grbl controller')
//   console.log(temp)
// }

// newnew()


module.exports= {newCode, editCode}