import React from "react";
import AnnouncementPage from "@/components/announcement/AnnouncementPage";

export const metadata = {
  title: "Announcements | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Announcements | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/community",
  },
  twitter: {
    title: "Announcements | Alhuda Islamic Center",
    description:
      "",
  },
};

const page = () => {
  return (
    <div>
      <AnnouncementPage  />
    </div>
  ); 
};

export default page;
