import Image from "next/image";
import Hero from "@/components/hero/Hero";
import PrayerTimes from "@/components/prayerTimes/Prayer";
import Events from "@/components/events/Events";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <PrayerTimes />
      <Events />
    </main>
  );
}
