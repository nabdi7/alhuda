import React from "react";
import EventsPage from "@/components/events/EventsPage";

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
      <EventsPage />
    </div>
  ); 
};

export default page;
