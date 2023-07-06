import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
  organization: "org-o0myWrUdzpEszTerr5SNxgbm",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  try{
      let res =  await getCompletion(input);
      console.log(res.data.choices[0].message);
      if(res.data.choices[0].message.function_call){
        const fnName = res.data.choices[0].message.function_call.name;
        const args = res.data.choices[0].message.function_call.arguments;
        
        //fnName(JSON.parse(args));

        const fn = fnName(JSON.parse(args));
        const result = await fn(JSON.parse(args));

        console.log(`Function call: ${fnName}, Arguments: ${args}`);
        console.log(`Calling Function ${fnName} Result: ` + result);

        messages.push({
          role: "assistant",
          content: "",
          function_call: {
            name: fnName,
            arguments: args,
          },
        });

        messages.push({
          role: "function",
          name: fnName,
          content: JSON.stringify({ result: result }),
        });
      }
      userInterface.prompt();
    }catch(e){
      console.log(e);
    }
});

const getCompletion = async (messages) => {
  const response   = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: messages }],
      temperature : 0,
      functions: [
        {
          "name": "send_email",
          "description": "Please send an email.",
          "parameters": {
            "type": "object",
            "properties": {
              "to_address": {
                "type": "string",
                "description": "To address for email"
              },
              "subject": {
                "type": "string",
                "description": "subject of the email"
              },
              "body": {
                "type": "string",
                "description": "Body of the email"
              }
            }
          }
        },
        {
          "name": "book_travel",
          "description": "Book travel",
          "parameters": {
            "type": "object",
            "properties": {
              "destination": {
                "type": "string",
                "description": "Your travel destination."
              },
              "departute": {
                "type": "string",
                "description": "From where are you traveling"
              },
              "number_people": {
                "type": "string",
                "description": "How many people are traveling"
              },
              "travel_mode": {
                "type": "string",
                "description": "What mode of travel will it be."
              }
            }
          }
        }
      ]
    })
    return response;
};

function send_email(){
  return "send email"
}

function book_travel() {
  return "travel booked"
}