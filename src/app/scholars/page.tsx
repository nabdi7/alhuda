import React from "react";
import Scholars from "@/components/center/Scholars"; 

export const metadata = {
  title: "Our Team | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Our Team | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Our Team | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <Scholars />
    </div>
  ); 
};

export default page;
