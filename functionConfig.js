module.exports = [
  {
    name: "send_email",
    description: "Please send an email.",
    parameters: {
      type: "object",
      properties: {
        to_address: {
          type: "string",
          description: "To address for email",
        },
        subject: {
          type: "string",
          description: "subject of the email",
        },
        body: {
          type: "string",
          description: "Body of the email",
        },
      },
      required: ["to_address", "subject", "body"],
    },
  },
  {
    name: "book_travel",
    description: "Book travel.",
    parameters: {
      type: "object",
      properties: {
        destination: {
          type: "string",
          description:
            "Your travel destination.this is required value dont set ambigous value . Take input from user",
        },
        departure: {
          type: "string",
          description:
            "From where are you traveling. this is required value dont set ambigous value . take input from user",
        },
        number_people: {
          type: "integer",
          description:
            "How many people are traveling. this is required value dont set ambigous value . take input from user",
          default: false,
        },
        travel_mode: {
          type: "string",
          description:
            "What mode of travel will it be. this is required value dont set ambigous value . take input from user",
          enum: ["Flight", "Train", "Bus"],
        },
        when: {
          type: "string",
          description:
            "Please provide date or timestamp. this is required value don't set default or ambiguous value . take input from user e.g 2 july 2024 at 10AM",
          //   default: false,
        },
      },
      required: [
        "destination",
        "departure",
        "number_people",
        "travel_mode",
        "when",
      ],
    },
  },
  {
    name: "book_ride",
    description:
      "Book a ride to office. You should NEVER call this function before rides_available has been called in conversation.",
    parameters: {
      type: "object",
      properties: {
        pickup_location: {
          type: "string",
          description:
            "Your pickup location.this is required value don't set ambiguous value . Take input from user",
        },
        office_location: {
          type: "string",
          description:
            "Your office location. this is required value don't set ambiguous value . Take input from user.",
        },
        car_type: {
          type: "string",
          description:
            "Which type of car you prefer e.g Standard Car, SUV, Luxury Car. this is required value don't set ambiguous value . take input from user",
          enum: ["Standard Car", "SUV", "Luxury Car"],
        },
        selected_ride_id: {
          type: "integer",
          description: "Ask User to provide ID of selected ride.",
        },
      },
      required: [
        "pickup_location",
        "office_location",
        "car_type",
        "selected_ride_id",
      ],
    },
  },
  {
    name: "rides_available",
    description: "List of rides available in your area.",
    parameters: {
      type: "object",
      properties: {
        pickup_location: {},
      },
    },
  },
];
