"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

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
      Jumua?: string;
    };
  };
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [fridayPrayers, setFridayPrayers] = useState<PrayerTime[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const latitude = "47.3809";
        const longitude = "-122.2348";
        const method = "2";
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
          { name: "Jumu'ah", time: "1:00 PM" },
          { name: "Jumu'ah", time: "2:00 PM" },
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
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCurrentPrayer = () => {
    if (prayerTimes.length === 0) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerTimeMinutes = prayerTimes.map((prayer) => {
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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">
              Alhuda Islamic Center
            </h2>
            <p className="text-green-100 text-sm">
              25650 101st Ave SE, Kent, WA
            </p>
          </div>

          <div className="p-4 bg-green-50 border-b border-gray-200 flex justify-between items-center">
            <button
              className="text-green-600 hover:text-green-800 transition-colors"
              onClick={handlePreviousDay}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-green-700">
              {formatDate(currentDate)}
            </h2>
            <button
              className="text-green-600 hover:text-green-800 transition-colors"
              onClick={handleNextDay}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-12">{error}</div>
            ) : (
              <div>
                <div className="space-y-4">
                  {prayerTimes.map((prayer) => {
                    const isCurrentPrayer = prayer.name === getCurrentPrayer();
                    return (
                      <div
                        key={prayer.name}
                        className={`relative flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${
                          isCurrentPrayer ? "ring-2 ring-green-500" : ""
                        }`}
                      >
                        {isCurrentPrayer && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                              Current
                            </div>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock
                            className={`w-8 h-8 mr-4 ${
                              isCurrentPrayer
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          />
                          <h3 className="font-bold text-lg">{prayer.name}</h3>
                        </div>
                        <p
                          className={`text-lg ${
                            isCurrentPrayer
                              ? "text-green-600 font-bold"
                              : "text-gray-600"
                          }`}
                        >
                          {prayer.time}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {fridayPrayers.length > 0 && (
                  <div className="mt-6 bg-green-50 rounded-xl p-4 shadow-md">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                      Friday Prayers
                    </h3>
                    <div className="space-y-3">
                      {fridayPrayers.map((prayer, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <h4 className="text-gray-700 font-medium">
                              {index === 0 ? "1st" : "2nd"} Prayer
                            </h4>
                          </div>
                          <p className="text-xl font-bold text-green-600">
                            {prayer.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
