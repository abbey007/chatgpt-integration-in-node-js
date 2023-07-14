const readline = require("readline");
const { getCompletion } = require("./gpt");

function isValidDate(dateObject) {
  const compare =
    new Date(dateObject).toString() !== "Invalid Date" &&
    new Date(dateObject) >= new date();
  return compare;
}
const messages = [
  {
    role: "system",
    content: `Ask the User following step-by-step instructions and respond to user inputs.
                  Step 1 - Ask User for the pickup location first when user ask to book a office ride.When ask for pickup send this map location https://www.google.co.in/maps/@28.6020871,77.3690171,14.58z?entry=ttu link to user to choose location on map
                  Step 2 - Once user gives the pickup location then ask for office location. 
                  Step 3 - Once Step 1 to 2 inputs are given ask for car type? when ask for car type share list of car type ["Standard Car", "SUV", "Luxury Car"]    
                  Step 4 - Once step 3 inputs are given call rides_available function.
                  Step 5 - Once the step 4 completed ask for selected ride ID to user.             
                  Step 6 - When pickup_location, office_location, car_type, selected_ride_id are provided by user or found in conversation history and the user has clearly stated they confirm call the function book_travel
                  don't make assumption or set any default value. 
                  Call book_ride only when you have [pickup_location, office_location, car_type, selected_ride_id] in conversation history and the user has clearly stated they confirm, 
                  otherwise you must continue asking about the missing values.
                  `,
  },
];

// [
//   {
//     role: "system",
//     content: `It's mandatory to only call
//                             book_travel function when user input all parameters which are required.
//                             Dont make assumption or set any default value.
//                             Ask for [destination, departure, number_people, travel_mode,when].
//                             Call book_travel only when you have [destination, departure, number_people, travel_mode,when] in conversation history and the user has clearly stated they confirm,
//                             otherwise you must continue interviewing.`,
//   },
// ];
//{role: "system", content: "Your name is Abhijeet's Genie"}

var dyn_functions = [];
dyn_functions["send_email"] = function (args) {
  return "send email";
};

dyn_functions["book_travel"] = function (args) {
  console.log("args ->", args);
  console.log(">>>>> ", isValidDate(args.when));
  // if(args.number_people == '1')
  //    return { "error" : "invalid number_people" }
  if (!isValidDate(args.when) || !args.when) {
    return { error: "Invalid travel date, please provide again" };
  }

  return { data: "Ticket Booked. Details are :" + JSON.stringify(args) };
};

dyn_functions["book_ride"] = function (args) {
  console.log("args ->", args);
  return { data: "Office Ride Booked. Details are :" + JSON.stringify(args) };
};

dyn_functions["rides_available"] = function (args) {
  const rides = [
    {
      ID: 1,
      name: "xyz",
      distance: "2 Km",
      rating: "4.1",
    },
    {
      ID: 2,
      name: "abc",
      distance: "4 Km",
      rating: "4.2",
    },
  ];
  return {
    data:
      "You may accept one of the offers quoted below or you may counter an offer as well.  :" +
      JSON.stringify(rides),
  };
};
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  try {
    messages.push({ role: "user", content: input });
    let res = await getCompletion(messages);
    if (res.data.choices[0].message.function_call) {
      const fnName = res.data.choices[0].message.function_call.name;
      const args = JSON.parse(
        res.data.choices[0].message.function_call.arguments
      );
      //console.log(`Function call: ${fnName}, Arguments: ${args}`);

      const fn = dyn_functions[fnName];
      const result = await fn(args);

      console.log(
        `Calling Function ${fnName} Result: ` + JSON.stringify(result)
      );

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
        }
      );

      res = await getCompletion(messages);
      console.log(res.data.choices[0].message);
    } else {
      console.log(res.data.choices[0].message);
      // messages.push({
      //   role: "system",
      //   content: `It's mandatory to only call
      //     book_travel function when user input all parameters which are required.
      //     Dont make assumption or set any default value.
      //     Ask for [destination, departure, number_people, travel_mode,when].
      //     Call book_travel only when you have [destination, departure, number_people, travel_mode,when] in conversation history and the user has clearly stated they confirm,
      //     check if date is not the previous date
      //     otherwise you must continue interviewing.`,
      // });
      messages.push({
        role: "assistant",
        content: res.data.choices[0].message.content,
      });
    }
    userInterface.prompt();
  } catch (e) {
    console.log(e.response);
  }
});
