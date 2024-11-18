import React from "react";
import Events from "@/components/events/Events";

export const metadata = {
  title: "Events | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Events | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Events | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <Events />
    </div>
  ); 
};

export default page;
