"use server"
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, 
  });

export async function imageRecognition(url) {
  console.log('inside image recognition')
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image? What is the quantity. Reply with 2 sentences. First what it is and then the quantity. Like this (apples.2) Just that one sentence the object. then another sentence the number." },
          {
            type: "image_url",
            image_url: {
              "url": url,
            },
          },
        ],
      },
    ],
  });
  // console.log(response)
  // console.log(response.choices)
  console.log(response.choices[0])

  return response.choices[0]['message']['content']
}
