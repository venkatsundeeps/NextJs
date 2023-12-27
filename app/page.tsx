"use client";
import React, { useState } from "react";
import axios from "axios";
const Home = () => {
  const [dat, setDat] = useState("");
  const fecthing = () => {
    const data = {
      name: "somethig",
      img: "ImageURL",
    };
    const response = axios.post("/api/img-upscale", data);
    setDat(response.data || "check");
  };

  return (
    <div>
      <h2>Home: {dat}</h2>
      <button onClick={fecthing}>btn</button>
    </div>
  );
};

export default Home;
