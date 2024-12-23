import React from "react";
import Funeral from "@/components/services/Funeral";

export const metadata = {
  title: "Funeral Service | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Funeral Service | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Funeral Service | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <Funeral />
    </div>
  ); 
};

export default page;
