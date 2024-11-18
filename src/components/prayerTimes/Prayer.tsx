"use client"
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

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
    };
  };
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Kent, WA coordinates
        const latitude = '47.3809';
        const longitude = '-122.2348';
        const method = '2'; // Islamic Society of North America (ISNA)

        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data: AlAdhanResponse = await response.json();

        // Format time from 24h to 12h format
        const formatTime = (time24: string) => {
          const [hours, minutes] = time24.split(':');
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes} ${ampm}`;
        };

        const times = [
          { name: 'Fajr', time: formatTime(data.data.timings.Fajr) },
          { name: 'Dhuhr', time: formatTime(data.data.timings.Dhuhr) },
          { name: 'Asr', time: formatTime(data.data.timings.Asr) },
          { name: 'Maghrib', time: formatTime(data.data.timings.Maghrib) },
          { name: 'Isha', time: formatTime(data.data.timings.Isha) }
        ];

        setPrayerTimes(times);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prayer times:', err);
        setError('Unable to load prayer times. Please try again later.');
        setLoading(false);
      }
    };

    fetchPrayerTimes();

    // Refresh prayer times at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      fetchPrayerTimes();
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  const getCurrentPrayer = () => {
    if (prayerTimes.length === 0) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerTimeMinutes = prayerTimes.map(prayer => {
      const [time, period] = prayer.time.split(' ');
      const [hours, minutes] = time.split(':');
      let hour = parseInt(hours);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Prayer Times for Kent, WA
          </h2>
          <p className="text-gray-600">Join us for daily prayers at the mosque</p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {prayerTimes.map((prayer) => {
                const isCurrentPrayer = prayer.name === getCurrentPrayer();
                return (
                  <div
                    key={prayer.name}
                    className={`relative bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow ${
                      isCurrentPrayer ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    {isCurrentPrayer && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                    <Clock className={`w-8 h-8 mx-auto mb-2 ${isCurrentPrayer ? 'text-green-600' : 'text-gray-600'}`} />
                    <h3 className="font-bold text-lg mb-1">{prayer.name}</h3>
                    <p className={`${isCurrentPrayer ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
                      {prayer.time}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              Prayer times are calculated using ISNA method
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PrayerTimes;