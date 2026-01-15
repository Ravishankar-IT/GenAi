import { GoogleGenerativeAI } from "@google/generative-ai";
import {exec} from "child_process";
import readlineSync from 'readline-sync';
import 'dotenv/config'
import util from "util";
import os from 'os';

const platform = os.platform();

const execute = util.promisify(exec);

// Configure the client
const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY);

const commandExecuter = {
    name:"executeCommand",
    description: "It takes any shell/terminal command and execute it. It will help us to create, read, write, update, delete any folder and file",
    parameters:{
        type: "object",
        properties:{
            command:{
                type:"string",
                description: "It is the terminal/shell command. Ex: mkdir calculator , touch calculator/index.js etc"
            }
        },
        required:['command']
    }
}

const model = genAI.getGenerativeModel({ 
    model: "gemini-pro", 
    tools: [{ functionDeclarations: [commandExecuter] }]
});

const chat = model.startChat();



// tool: 

async function executeCommand({command}){
    
    try{
    const {stdout,stderr}   = await execute(command);
     
    if(stderr){
        return `Error: ${stderr}`
    }

    return `Success: ${stdout}`

    }
    catch(err){
        return `Error: ${err}`
    }
}


while(true){

    const question = readlineSync.question("Ask me anything --> ");

    if(question == 'exit'){
        break;
    }

    const result = await chat.sendMessage(question);

    if (result.response.functionCalls && result.response.functionCalls.length > 0) {

        for (const functionCall of result.response.functionCalls) {

            const toolResponse = await executeCommand(functionCall.args);

            await chat.sendMessage([{ functionResponse: { name: functionCall.name, response: toolResponse } }]);

        }

    } else {

        console.log(result.response.text());

    }

}