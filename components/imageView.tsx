import React from "react";
// import Image from "next/image";
import { CldImage } from "next-cloudinary";

const ImageView = (props: any) => {
  return (
    <div>
      <CldImage
        src={props.src}
        width={230}
        height={100}
        className="rounded-md h-[200px] overflow-hidden shadow-lg "
        alt="user image"
      />
    </div>
  );
};

export default ImageView;
