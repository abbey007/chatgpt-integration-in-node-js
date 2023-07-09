module.exports = [
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
            },
            "required": ["to_address", "subject", "body"]
        },
    },
    {
        "name": "book_travel",
        "description": "Book travel",
        "parameters": {
            "type": "object",
            "properties": {
                "destination": {
                    "type": "string",
                    "description": "Your travel destination.this is required value dont set ambigous value . take input from user"
                },
                "departure": {
                    "type": "string",
                    "description": "From where are you traveling. this is required value dont set ambigous value . take input from user"
                },
                "number_people": {
                    "type": "integer",
                    "description": "How many people are traveling. this is required value dont set ambigous value . take input from user",
                    "default": false,
                },
                "travel_mode": {
                    "type": "string",
                    "description": "What mode of travel will it be. this is required value dont set ambigous value . take input from user",
                    "enum": ["Flight", "Train", "Bus"]
                },
                "when": {
                    "type": "string",
                    "description": "Please provide date and time. this is required value dont set ambigous value . take input from user",
                    "default": false,
                },
            },
            "required": ["destination", "departure", "number_people", "travel_mode","when"]
        }
    }
];