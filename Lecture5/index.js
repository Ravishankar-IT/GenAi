import { GoogleGenAI, Type } from '@google/genai';
import { type} from 'os';
import readlineSync from "readline-sync"
import 'dotenv/config'
// import { text } from 'stream/consumers';

// Configure the client
const ai = new GoogleGenAI({});

//
// {
    //  coin: "bitcoin"
    //  curr: "inr"
//  }

const a = {
    coin: "bitcoin",
    curr: "inr"
}

// crypto crrency tool

async function cryptocurrency({coin, curr}) {
     const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids = ${coin}`);
     const data = await response.json();
    console.log(data);
     return data;
}


// Weather tool

async function weatherInformation({city}){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=3338b60d2cd645f994894329260901&q=${city}&aqi=no`);
    const data = await response.json();
    console.group(data);
    return data;
}

// cryptocurrency({coin:"bitcoin"});
cryptocurrency({city:"bitcoin"});


// cryptocurrency wale ki information karke

const cryptoInfo = {
    name:"cryptoCurrency",
    description: "we can give you the current price  or other information related to cryptocurrency of any cryptocurrency like bitcoin and ethereum etc ",
    parameters: {
        type: Type.OBJECT, 
        properties: {
            coin:{
            type: Type.STRING,
            description: "It will be the name of thr cryptocurrency like bitcoin and ethereum"
            },
            // we need only coin here 
            // curr: 
            //     type: Type.STRING,
            //     description: "It will be the name of the real currency like inr, used etc, if user didn't mention about any country, default value will be inr  ",
            // }
        },
        required: ['coin' ]
    }
}


const weatherInfo = {
    name: "weatherInformation",
    description: " You can get the current weather information of any country like London, Goa, etc",
    parameters:{
        type: Type.OBJECT,
        properties:{
            city:{
                type: Type.STRING,
                description:"Name of the City for which I have to fetch weather Information like London, Goa, etc",

            }
        },
        required: ['city']
    }
}


const tools = [{
    functionDeclarations: [cryptoInfo,weatherInfo]
}];


const toolfunctions = {
    "cryptoCurrency": cryptocurrency,
    "weatherInformation": weatherInformation,
}

const History = [];

async function runAgent() {
    while(true){
        const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:  History,
        config: { tools },
  });


    if (result.functionCalls && result.functionCalls.length > 0) {
    
        const functionCall = result.functionCalls[0];

        const {name, args} = functionCall;

        // if(bame=="cryptoCurrency"){
        //     const response = await cryptocurrency(args);
        // }
        // elseif(name=="weatherInformation"){
        //     const response = await weatherInformation(args);
        // }

        const response = await toolfunctions[name](args);

         const functionResponsePart = {
            name: functionCall.name,
            response: {
            result: toolResponse,
        },
        };

        // Send the function response back to the model.
       History.push({
        role: "model",
        parts: [{functionCall: functionCall}],
       });

       history.push({
        role: "user",
        parts: [{ functionResponse: functionResponsePart} ],
       })

    }
    else{
        History.push({
            role:"model",
            parts: [{text:result.text}]
        });
        console.log(result.text);
    }




    }
}

while(true){

    const question = readlineSync.question('Ask me anything: ');

    if(question == 'exit'){
        break;
    }

    History.push({
        role: "user",
        parts: [{text:question}]
    });

    await runAgent ();

}