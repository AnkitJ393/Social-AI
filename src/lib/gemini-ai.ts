import {GoogleGenerativeAI} from "@google/generative-ai"

const  apiKey=`AIzaSyC7d2tpruO6yqfWBt6LxXZZWWenfB6if_s`;

const genAI=new GoogleGenerativeAI(apiKey);

const model=genAI.getGenerativeModel({
    model:'gemini-1.5-flash',
})

const generationConfig={
    temperature:1,
    topP:0.95,
    topK:64,
    maxOutputTokens:8192,
    responseMimeType:'text/plain',
}

export const chatSession=model.startChat({
    generationConfig:generationConfig,
    history:[]
})