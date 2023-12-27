import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { any } from "zod";
import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

// Fake users data
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const encodedParams = new URLSearchParams();
encodedParams.set(
  "prompt",
  "an astronaut riding a horse, digital art, epic lighting, highly-detailed masterpiece trending HQ"
);
encodedParams.set("guidance", "7");
encodedParams.set("steps", "30");
encodedParams.set("sampler", "euler_a");
encodedParams.set("upscale", "1");
encodedParams.set(
  "negative_prompt",
  "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft"
);
encodedParams.set("model", "epic_diffusion_1_1");

const options = {
  method: "POST",
  url: "https://dezgo.p.rapidapi.com/text2image",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "0b6e3ae1fdmsh8fd565dcf70d3c4p17929cjsn983ccded10e6",
    "X-RapidAPI-Host": "dezgo.p.rapidapi.com",
  },

  data: encodedParams,
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.request(options);
  return new NextResponse("test", await response.data);
};
