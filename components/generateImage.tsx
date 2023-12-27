import React from "react";
import Image from "next/image";

const GenerateImage = (props: any) => {
  return (
    <div>
      <Image
        src={props.img}
        width={600}
        height={500}
        className="rounded-lg h-[550px] w-[590px]"
        alt="Ai Generated Image"
      ></Image>
    </div>
  );
};

export default GenerateImage;
