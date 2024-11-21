import React from "react";
import Community from "@/components/services/Community";

export const metadata = {
  title: "Community Support | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Community Support  | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/community",
  },
  twitter: {
    title: "Community Support  | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <Community  />
    </div>
  ); 
};

export default page;
