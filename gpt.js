const { Configuration, OpenAIApi } = require("openai");
const functions =  require("./functionConfig.js");

const configuration = new Configuration({
    organization: "org-o0myWrUdzpEszTerr5SNxgbm",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const getCompletion = async (messages) => {
    const response = await openai
        .createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            messages: messages,
            temperature: 1,
            functions: functions
        })
    return response;
};
module.exports =  {
    getCompletion
}