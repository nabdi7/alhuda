import React from "react";
import Donate from "@/components/donate/Donate";

export const metadata = {
  title: "Donate | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Donate | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Donate | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <Donate />
    </div>
  ); 
};

export default page;
