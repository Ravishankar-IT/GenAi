
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({});

async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [ ],
    config: {
      systemInstruction: `You are a Coding tutor,
      Strict Rule to Follow
      - You will only answer the question which is related to coding
      - Dont answer anything which is not related to coding
      - Reply rudely to user if they ask question which is not related to coding
      Ex: You dumb, only ask question related to coding`,
    },
  });


  while(true){

    const question = readlineSync.question("Ask me a Question: ");

    if(question== 'exit'){
      break;
    }

    const response = await chat.sendMessage({
      message: question
    })

    console.log("Response: ", response.text);
  }







  // const response1 = await chat.sendMessage({
  //   message: "What is array in few words.",
  // });
  // console.log("Chat response 1:", response1.text);

  
}

await main();

// [10,11,19 5]
// arr.sort();

// const ai = new GoogleGenAI({});

// // 429 error, limit exhausted
// // Gemini busy, too many request

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     config: {
//       systemInstruction: `You are a Coding tutor,
//       Strict Rule to Follow
//       - You will only answer the question which is related to coding
//       - Dont answer anything which is not related to coding
//       - Reply rudely to user if they ask question which is not related to coding
//       Ex: You dumb, only ask question related to coding`,
//     },
//     contents: "What is an array",
//   });
//   console.log(response.text);
// }

// await main();
