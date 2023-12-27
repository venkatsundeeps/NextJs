import React from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const Imageenhancer = (props: any) => {
  console.log(props.img3);

  return (
    <div className=" flex felx-col items-center bg-gray-500 justify-evenly w-[800px]  shadow-2xl  h-[400px] rounded-[5px] border-2 border-gray-900">
      <div className="flex flex-col">
        {/* <h2 className="ml-10">Original</h2>  teal-500*/}
        <CldImage
          src={props.src}
          width={230}
          height={100}
          className="rounded-md overflow-hidden shadow-lg "
          alt="user image"
        />
      </div>
      <div className="flex flex-col">
        <Image
          src={props.img3}
          width={260}
          height={150}
          className="rounded-md overflow-hidden shadow-lg "
          alt="user-image"
        />
      </div>
    </div>
  );
};

export default Imageenhancer;
