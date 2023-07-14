const { Configuration, OpenAIApi } = require("openai");
const functions = require("./functionConfig.js");

const configuration = new Configuration({
  organization: "org-Ba8sBqnJLygHWzjmAzkTeifq",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const getCompletion = async (messages) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: messages,
    temperature: 0,
    functions: functions,
  });
  return response;
};
module.exports = {
  getCompletion,
};
