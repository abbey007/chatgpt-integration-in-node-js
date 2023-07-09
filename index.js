const readline = require("readline");
const { getCompletion }  = require("./gpt");
const messages = [{role: "system", 
                  content: `It's mandatory to only call 
                            book_travel function when user input all parameters which are required. 
                            Dont make assumption or set any default value. 
                            Ask for [destination, departure, number_people, travel_mode,when].
                            Call book_travel only when you have [destination, departure, number_people, travel_mode,when] in conversation history and the user has clearly stated they confirm, 
                            otherwise you must continue interviewing.`}]
//{role: "system", content: "Your name is Abhijeet's Genie"}

var dyn_functions = [];
dyn_functions['send_email'] = function (args) {
  return "send email"
};
dyn_functions['book_travel'] = function (args) { 
    // if(args.number_people == '1')
    //    return { "error" : "invalid number_people" }

    return { data : "Ticket Booked. Details are :"+ JSON.stringify(args) };
};

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  try{
      messages.push({ role: "user", content: input});
      let res =  await getCompletion(messages);
      if(res.data.choices[0].message.function_call){

        
        const fnName = res.data.choices[0].message.function_call.name;
        const args = JSON.parse(res.data.choices[0].message.function_call.arguments);
        //console.log(`Function call: ${fnName}, Arguments: ${args}`);

          const fn = dyn_functions[fnName]
          const result = await fn(args);

          console.log(`Calling Function ${fnName} Result: ` + JSON.stringify(result));

          messages.push(
            {
            role: "assistant",
            content: null,
            function_call: {
              name: fnName,
              arguments: JSON.stringify(args),
            },
          },
          {
            role: "function",
            name: fnName,
            content: JSON.stringify(result),
          });

          res = await getCompletion(messages);
          console.log(res.data.choices[0].message);

      }else{
          
          console.log(res.data.choices[0].message);
          messages.push({role: "system", content: `It's mandatory to only call 
          book_travel function when user input all parameters which are required. 
          Dont make assumption or set any default value. 
          Ask for [destination, departure, number_people, travel_mode,when].
          Call book_travel only when you have [destination, departure, number_people, travel_mode,when] in conversation history and the user has clearly stated they confirm,
          check if date is not the previous date 
          otherwise you must continue interviewing.`})
          messages.push({
            role: "assistant",
            content: res.data.choices[0].message.content,
          });

      }
      userInterface.prompt();
    }catch(e){
      console.log(e.response);
    }
});