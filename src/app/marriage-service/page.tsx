import React from "react";
import Marriage from "@/components/services/Marriage";

export const metadata = {
  title: "Marriage Service | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Marriage Service | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Marriage Service | Alhuda Islamic Center",
    description: 
      "",
  },
};

const page = () => {
  return (
    <div>
      <Marriage />
    </div>
  ); 
};

export default page;
