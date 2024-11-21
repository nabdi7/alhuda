"use client";
"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Sun, Moon, CloudSun, CloudMoon, Sunset } from "lucide-react";
import PageHeader from "../header/PageHeader";

interface PrayerTime {
  name: string;
  time: string;
}

interface AlAdhanResponse {
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      Sunrise?: string;
      Sunset?: string;
      Jumua?: string; // Added for Friday prayer
    };
  };
}

const getPrayerIcon = (prayerName: string) => {
  switch(prayerName) {
    case 'Fajr': return <Sun className="w-8 h-8 text-sky-500" />;
    case 'Dhuhr': return <CloudSun className="w-8 h-8 text-yellow-500" />;
    case 'Asr': return <Sunset className="w-8 h-8 text-orange-500" />;
    case 'Maghrib': return <CloudMoon className="w-8 h-8 text-indigo-500" />;
    case 'Isha': return <Moon className="w-8 h-8 text-purple-500" />;
    case 'Jumua': return <CloudSun className="w-8 h-8 text-green-500" />;
    default: return <Clock className="w-8 h-8 text-gray-500" />;
  }
};

const PrayerPage = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [fridayPrayers, setFridayPrayers] = useState<PrayerTime[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Kent, WA coordinates
        const latitude = "47.3809";
        const longitude = "-122.2348";
        const method = "2"; // Islamic Society of North America (ISNA)
        const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${currentTimestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch prayer times");
        }

        const data: AlAdhanResponse = await response.json();

        // Format time from 24h to 12h format
        const formatTime = (time24: string) => {
          const [hours, minutes] = time24.split(":");
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes} ${ampm}`;
        };

        const times = [
          { name: "Fajr", time: formatTime(data.data.timings.Fajr) },
          { name: "Dhuhr", time: formatTime(data.data.timings.Dhuhr) },
          { name: "Asr", time: formatTime(data.data.timings.Asr) },
          { name: "Maghrib", time: formatTime(data.data.timings.Maghrib) },
          { name: "Isha", time: formatTime(data.data.timings.Isha) },
        ];

        const fridayPrayers = [
          { name: "Jumua", time: "12:00 PM" },
          { name: "Jumua", time: "1:00 PM" },
        ];

        setPrayerTimes(times);
        setFridayPrayers(fridayPrayers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError("Unable to load prayer times. Please try again later.");
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [currentDate]);

  const handlePreviousDay = () => {
    setCurrentDate(new Date(currentDate.getTime() - 86400000)); 
  };

  const handleNextDay = () => {
    setCurrentDate(new Date(currentDate.getTime() + 86400000)); 
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentPrayer = () => {
    if (prayerTimes.length === 0) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerTimeMinutes = [...prayerTimes, ...fridayPrayers].map((prayer) => {
      const [time, period] = prayer.time.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
      return { name: prayer.name, minutes: hour * 60 + parseInt(minutes) };
    });

    for (let i = prayerTimeMinutes.length - 1; i >= 0; i--) {
      if (currentTime >= prayerTimeMinutes[i].minutes) {
        return prayerTimeMinutes[i].name;
      }
    }

    return prayerTimeMinutes[prayerTimeMinutes.length - 1].name;
  };

  return (
    <>
      <PageHeader title="Prayer Times" breadcrumb="Prayers" />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/pic9.webp"
                alt="Man praying"
                className="max-w-full h-auto"
              />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
              And establish prayer. Indeed, prayer has been decreed upon the
              believers a timed prescription.
            </p>
            <p className="text-green-600 font-semibold">- Quran 4:103</p>
          </div>

          <div className="w-full bg-gradient-to-br from-green-50 to-green-100 shadow-2xl rounded-2xl overflow-hidden border-2 border-green-200">
            <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-md">Alhuda Islamic Center</h2>
              <p className="text-green-100 text-sm">25650 101st Ave SE, Kent, WA</p>
            </div>
            
            <div className="p-4 bg-white/70 backdrop-blur-sm border-b border-green-200 flex justify-between items-center">
              <button
                className="text-green-600 hover:text-green-800 transition-all duration-300 transform hover:-translate-x-1"
                onClick={handlePreviousDay}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <h2 className="text-2xl font-semibold text-green-700">
                {formatDate(currentDate)}
              </h2>
              <button
                className="text-green-600 hover:text-green-800 transition-all duration-300 transform hover:translate-x-1"
                onClick={handleNextDay}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-12">{error}</div>
              ) : (
                <div>
                  <div className="space-y-5">
                    {prayerTimes.map((prayer) => {
                      const isCurrentPrayer = prayer.name === getCurrentPrayer();
                      return (
                        <div
                          key={prayer.name}
                          className={`
                            relative group
                            bg-white 
                            rounded-xl 
                            shadow-lg 
                            hover:shadow-xl 
                            transition-all 
                            duration-300 
                            border 
                            ${isCurrentPrayer 
                              ? 'border-green-500 ring-4 ring-green-200' 
                              : 'border-gray-200 hover:border-green-300'}
                            overflow-hidden
                          `}
                        >
                          {isCurrentPrayer && (
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                              Current Prayer
                            </span>
                          )}
                          <div className="flex items-center p-4 space-x-4">
                            <div className="flex-shrink-0">
                              {getPrayerIcon(prayer.name)}
                            </div>
                            <div className="flex-grow">
                              <h3 className={`
                                text-lg font-semibold 
                                ${isCurrentPrayer ? 'text-green-700' : 'text-gray-700'}
                              `}>
                                {prayer.name} Prayer
                              </h3>
                            </div>
                            <div>
                              <p className={`
                                text-xl font-bold 
                                ${isCurrentPrayer 
                                  ? 'text-green-600' 
                                  : 'text-gray-600 group-hover:text-green-500'}
                                transition-colors duration-300
                              `}>
                                {prayer.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {fridayPrayers.length > 0 && (
                    <div className="mt-6 bg-green-50 rounded-xl p-4 shadow-md">
                      <h3 className="text-lg font-semibold text-green-700 mb-2">Friday Prayers</h3>
                      <div className="space-y-3">
                        {fridayPrayers.map((prayer, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              {getPrayerIcon('Jumua')}
                              <h4 className="text-gray-700 font-medium">Jumuah {index + 1}</h4>
                            </div>
                            <p className="text-xl font-bold text-green-600">{prayer.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-4 bg-green-50 border-t border-gray-200 text-center">
              <p className="text-sm text-green-800 opacity-70">
              🕌 Prayer times 
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrayerPage;