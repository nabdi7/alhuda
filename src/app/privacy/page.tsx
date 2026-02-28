import React from "react";
import PrivacyPolicy from "@/components/privacy/Privacy";

export const metadata = {
  title: "Privacy Policy | Alhuda Islamic Center",
  description:
    "Privacy policy for the Alhuda Islamic Center of kent",
  openGraph: {
    title: "Privacy Policy | Alhuda Islamic Center",
    description:
      "Privacy policy for the Alhuda Islamic Center of kent",
    type: "website",
    url: "https://alhudaislamiccenter.com/privacy",
  },
  twitter: {
    title: "Privacy Policy | Alhuda Islamic Center",
    description:
      "Privacy policy for the Alhuda Islamic Center of kent",
  },
};

const page = () => {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  ); 
};

export default page;
