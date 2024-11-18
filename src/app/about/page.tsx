import React from "react";
import About from "@/components/center/About";

export const metadata = {
  title: "About Us | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "About Us | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "About Us | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <About />
    </div>
  ); 
};

export default page;
