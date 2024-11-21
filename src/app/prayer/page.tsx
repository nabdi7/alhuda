import React from "react";
import PrayerPage from "@/components/prayerTimes/PrayerPage";

export const metadata = {
  title: "Prayer Times | Alhuda Islamic Center",
  description:
    "",
  openGraph: {
    title: "Prayer Times | Alhuda Islamic Center",
    description:
      "",
    type: "website",
    url: "https://alhudaislamiccenter.com/about",
  },
  twitter: {
    title: "Prayer Times | Alhuda Islamic Center",
    description:
      "",
  },
};
const page = () => {
  return (
    <div>
      <PrayerPage />
    </div>
  );
};

export default page;
