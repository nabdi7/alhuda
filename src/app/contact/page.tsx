import React from "react";
import Contact from "@/components/contact/Contact";

export const metadata = {
  title: "Contact Us | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Contact Us | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Contact Us | Alhuda Islamic Center",
    description:
      "",
  },
};
const page = () => {
  return (
    <div>
      <Contact />
    </div>
  );
};

export default page;
