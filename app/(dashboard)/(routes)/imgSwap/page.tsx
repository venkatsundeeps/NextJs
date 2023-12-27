"use client";
import { ImagePlus, UploadCloud } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { CldUploadWidget } from "next-cloudinary";
import Imageenhancer from "@/components/imageenhancer";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
import * as z from "zod";
// import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageView from "@/components/imageView";
import GenerateImage from "@/components/generateImage";

interface cloudinaryResult {
  public_id: string;
}

function Hairstyles() {
  const router = useRouter();
  const [publicId, setPublicId] = useState("");
  const [publicId2, setPublicId2] = useState("");
  const [genImage, setGenImage] = useState("");
  const [loading, setLoading] = useState(false);
  //cloudinary public id to imageurl
  const cloudinaryImageUrl: string = `https://res.cloudinary.com/dzsr56zkk/image/upload/v1699633289/${publicId}.jpg`;

  const cloudinaryImageUrl2: string = `https://res.cloudinary.com/dzsr56zkk/image/upload/v1699633289/${publicId2}.jpg`;

  const getJsonData = async () => {
    const options = {
      TargetImageUrl: cloudinaryImageUrl,
      SourceImageUrl: cloudinaryImageUrl2,
    };
    try {
      console.log("Data before POST request:", options);
      const response = await axios.post("/api/hairClip/", options);
      // const responseData = response;
      console.log("Response data:", response.data);
      setGenImage(response.data);
      // Rest of the code...
    } catch (error) {
      console.error("Error in API request:", error);
    }
  };

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     pose_image: cloudinaryImageUrl,
  //     face_image: cloudinaryImageUrl2,
  //   },
  // });

  //EXTRACT LOADING STATE HERE
  return (
    <>
      <div>
        <Heading
          title="Face Swap"
          iconColor="Image"
          bgColor="bg-violet-500/10"
          icon={ImagePlus}
          description="Face Swap Your Image with AI"
        />
      </div>

      <div className="flex  justify-evenly items-center space-x-10 ">
        <div className="flex flex-col space-y-8">
          <div>
            <div className="px-[85px]">
              <CldUploadWidget
                //uploading image to cloudinary
                uploadPreset="bokwgfvh"
                onUpload={async (result, widget) => {
                  const info = result.info as cloudinaryResult;
                  setPublicId(info.public_id);
                  if (result.event !== "success") return;
                }}
                // onClose={getJsonData}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="flex flex-col justify-center items-center w-[230px] h-[70px] rounded-[5px]  border-2 hover:border-teal-500"
                  >
                    {/* upload icon */}
                    <UploadCloud />
                    <h1>Upload Pose Image</h1>
                  </button>
                )}
              </CldUploadWidget>
            </div>
            {publicId && (
              <div className="mt-[20px] ml-[85px]">
                <ImageView src={publicId} img={cloudinaryImageUrl}></ImageView>
              </div>
            )}
          </div>
          {/* ---------------------- */}
          <div>
            <div className="px-[85px]  ">
              <CldUploadWidget
                //uploading image to cloudinary
                uploadPreset="bokwgfvh"
                onUpload={async (result, widget) => {
                  const info = result.info as cloudinaryResult;
                  setPublicId2(info.public_id);
                  if (result.event !== "success") return;
                }}
                // onClose={getJsonData}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="flex flex-col justify-center items-center w-[230px] h-[70px] rounded-[5px]  border-2 hover:border-teal-500"
                  >
                    {/* upload icon */}
                    <UploadCloud />
                    <h1>Upload Face Image</h1>
                  </button>
                )}
              </CldUploadWidget>
            </div>
            {publicId2 && (
              <div className="mt-[20px] ml-[85px]  ">
                <ImageView
                  src={publicId2}
                  img={cloudinaryImageUrl2}
                ></ImageView>
              </div>
            )}
          </div>
        </div>

        {publicId && publicId2 && (
          <div className=" ">
            <button
              onClick={getJsonData}
              className="w-[150px] bg-cyan-400 ml-[-30px] border-solid rounded h-[50px] hover:bg-cyan-300"
            >
              <h1>Swap Image</h1>
            </button>
          </div>
        )}

        {/* ---------------------- */}
        {genImage && (
          <div>
            <GenerateImage img={genImage} />
          </div>
        )}
      </div>
    </>
  );
}

export default Hairstyles;
