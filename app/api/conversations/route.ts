import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const messages = body;
  console.log(messages);

  // const options = {
  //   method: "POST",
  //   url: "https://chatgpt-42.p.rapidapi.com/gpt4",
  //   headers: {
  //     "content-type": "application/json",
  //     "X-RapidAPI-Key": "0b6e3ae1fdmsh8fd565dcf70d3c4p17929cjsn983ccded10e6",
  //     "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
  //   },
  //   data: {
  //     messages: [
  //       {
  //         role: "user",
  //         content: "who are you",
  //       },
  //     ],
  //     tone: "Balanced",
  //   },
  // };

  try {
    // const response = await axios.request(options);
    console.log(messages);
    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
