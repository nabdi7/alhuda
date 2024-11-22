import Image from "next/image";
import Hero from "@/components/hero/Hero";
import Announcement from "@/components/announcement/Announcement";
import PrayerTimes from "@/components/prayerTimes/Prayer";
import Events from "@/components/events/Events";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Announcement />
      <PrayerTimes />
      <Events />
    </main>
  );
}
