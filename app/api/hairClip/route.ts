import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.REPLICATE,
});

export async function POST(req: Request, res: Response) {
  const prediction = await req.json();
  console.log(prediction);
  const options = {
    method: "POST",
    url: "https://faceswap-image-transformation-api.p.rapidapi.com/faceswap",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "0b6e3ae1fdmsh8fd565dcf70d3c4p17929cjsn983ccded10e6",
      "X-RapidAPI-Host": "faceswap-image-transformation-api.p.rapidapi.com",
    },
    data: prediction,
  };
  // res.end(JSON.stringify(prediction));
  try {
    const output = await axios.request(options);
    // Rest of the code...
    console.log(output.data.ResultImageUrl);
    return Response.json(output.data.ResultImageUrl);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
