"use client";
import { ImagePlus, UploadCloud } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import Imageenhancer from "@/components/imageenhancer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { env } from "process";
import Image from "next/image";
import Error from "next/error";
import FormData from "form-data";
// import { useSWR } from "swr";
// import cloudinary from "cloudinary";

interface cloudinaryResult {
  public_id: string;
}

const ImageUpscaler = () => {
  //States
  const router = useRouter();
  const [publicId, setPublicId] = useState("");
  const [upScaledImage, setUpscaledImage] = useState("");
  const [loading, setLoading] = useState(false);
  //cloudinary public id to imageurl
  const cloudinaryImageUrl: string = `https://res.cloudinary.com/dzsr56zkk/image/upload/v1699633289/${publicId}.jpg`;

  // Convert to Binary to send in binary

  // const url = "https://dezgo.p.rapidapi.com/upscale";
  const getJsonData = async () => {
    const imageUrl = cloudinaryImageUrl;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      const options = {
        method: "POST",
        headers: {
          "X-RapidAPI-Key":
            "0b6e3ae1fdmsh8fd565dcf70d3c4p17929cjsn983ccded10e6",
          "X-RapidAPI-Host": "dezgo.p.rapidapi.com",
        },
        body: formData,
      };

      const responseFromApi = await fetch(
        "https://dezgo.p.rapidapi.com/upscale",
        options
      );
      const resultBlob = await responseFromApi.blob();
      const processedImageUrl = URL.createObjectURL(resultBlob);
      console.log(processedImageUrl);

      setUpscaledImage(processedImageUrl);
      // Convert the result blob to a data URL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Image Upscaler"
          iconColor="Image"
          bgColor="bg-violet-500/10"
          icon={ImagePlus}
          description="Upscale Your Image with AI"
        />
      </div>
      <div>{/* <button onClick={getJsonData}>get Upscaled</button> */}</div>

      <div className="px-[85px]">
        <CldUploadWidget
          //uploading image to cloudinary
          uploadPreset="bokwgfvh"
          onUpload={async (result, widget) => {
            const info = result.info as cloudinaryResult;
            setPublicId(info.public_id);
            if (result.event !== "success") return;
          }}
          onClose={getJsonData}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="flex flex-col justify-center items-center w-[200px] h-[70px] rounded-[5px]  border-2 hover:border-teal-500"
            >
              {/* upload icon */}
              <UploadCloud />
              <h2>Upload an Image</h2>
              {/* <button onClick={fecthing()}>onchange</button> */}
            </button>
          )}
        </CldUploadWidget>
      </div>
      {publicId && (
        <div className="mt-[20px] ml-[250px]">
          <Imageenhancer
            src={publicId}
            img2={cloudinaryImageUrl}
            img3={upScaledImage}
          ></Imageenhancer>
        </div>
      )}
    </>
  );
};

export default ImageUpscaler;
