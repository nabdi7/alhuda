import Image from "next/image";
import Hero from "@/components/hero/Hero";
import Announcement from "@/components/announcement/Announcement";
import PrayerTimes from "@/components/prayerTimes/Prayer";
import Events from "@/components/events/Events";
import WhatsApp from "@/components/cta/WhatsApp";
import AboutUs from "@/components/center/AboutUs";
import SermonsSection from "@/components/center/Sermons";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Announcement />
      <AboutUs />
      <SermonsSection />
      <PrayerTimes />
      <Events />
      <WhatsApp />
    </main>
  );
}
