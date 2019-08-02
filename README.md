# Calculator App

## Instructions

Create a frontend web app. For this challenge to be interesting, instead of performing the calculation locally, the app will talk to a Calculator API which endpoints are described below. Note that for this simulation, running a calculation is an expensive operation. 

* Tapping a number will immediately send it to the API.
* Tapping +/- will also immediately send it to the API. 
* Tapping = will get the result from the API and display it in the result text view.
* It is not possible to tap two numbers or two operators in a row. This will be enforced by the API. 

## API Specification 

Note: The API base URL is provided in the email. 

**POST /calculations/** 

Creates a new calculation

* Input examples:
    * {}
* Output 

`
{
    "id": "ed194837-26e1-49fd-95d5-7bb3ae79261f"
}
`

 **GET /calculations**

 List all calculations

 * Output:

 `[
    {
        "id": "ed194837-26e1-49fd-95d5-7bb3ae79261f",
        "tokens": [
            {
                "type": "number",
                "value": 5
            }
        ]
    }
]`

**GET /calculations/:calculationId/**

Describes a single calculations.

* Output:

`{
    "id": "ed194837-26e1-49fd-95d5-7bb3ae79261f",
    "tokens": [
        {
        "type": "number",
        "value": 5
        }
    ]
}`

* Errors:
    * Will return `404` if the calculation id does not exist.

**POST /calculations/:calculationId/tokens**

Add a token to a calculation. 

* Input examples: 
    * { "type": "number", "value": 5}
    * { "type": "operator", "value": "+"}

* Output: 

`{
    "type": "operator",
    "value": "+"
}`

* Errors 
    * Will return `400` if the last token of the same type 
    * Will return `400` if the value is not of the appropriate JSON type (`number` for numbers, `string` for operators)

**GET /calculations/:calculationId/result**

Returns the result of the calculation. 

`{
    "result":10
}`

* Errors:
    * Will return `400` if the last token is an operator 