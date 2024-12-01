import React from "react";
import {
  Megaphone,
  Clock,
  MapPin,
  AlertCircle,
  Calendar,
  BookOpen,
} from "lucide-react";

// Define interfaces for type safety
interface Alert {
  message: string;
}

interface Schedule {
  days: string;
  times: string;
}

interface Program {
  name: string;
  time: string;
  levels?: string[];
  topics?: string[];
}

interface RamadanTimes {
  taraweeh?: string;
  tahajud?: string;
}

interface Announcement {
  id: number;
  title: string;
  type: "regular" | "dugsi" | "ramadan" | "eid";
  times?: string[] | RamadanTimes;
  alert?: Alert;
  schedule?: Schedule;
  location?: string;
  programs?: Program[];
  subtitle?: string;
  date?: string;
  description?: string;
  additionalInfo?: string | string[];
}

const Announcement: React.FC = () => {
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Friday Prayer Times",
      times: ["1:00 PM", "2:00 PM"],
      alert: {
        message:
          "Due to Daylight Saving Time, all prayer times will be pushed back by one hour starting November 3rd 2024",
      },
      type: "regular",
    },
    {
      id: 2,
      title: "Weekend Islamic School (Dugsi)",
      type: "dugsi",
      schedule: {
        days: "Saturday & Sunday",
        times: "9:00 AM - 1:00 PM",
      },
      location: "Alhuda Mosque",
      programs: [
        {
          name: "Quran Memorization",
          time: "9:00 AM - 10:30 AM",
          levels: ["All Ages"],
        },
        {
          name: "Islamic Studies",
          time: "10:45 AM - 11:45 AM",
          topics: ["Aqeedah", "Fiqh", "Seerah"],
        },
        {
          name: "Arabic Language",
          time: "12:00 PM - 1:00 PM",
        },
      ],
    },
    // {
    //   id: 3,
    //   title: "Ramadhan 2025",
    //   subtitle: "Ramadan Mubarak",
    //   date: "March 1st, 2025",
    //   description:
    //     "May this blessed month bring peace, prosperity and happiness to all.",
    //   times: {
    //     taraweeh: "8:30 PM",
    //     tahajud: "1:00 PM",
    //   },
    //   additionalInfo:
    //     "Please bring your prayer mats. Light breakfast will be served after each prayer.",
    //   type: "ramadan",
    // },
    // {
    //   id: 4,
    //   title: "Eid ul-Fitr 2025 Prayer Times",
    //   subtitle: "Eid Mubarak",
    //   date: "March 31st, 2025",
    //   description: "May Allah accept our fasts, prayers, and good deeds.",
    //   times: ["7:30 AM", "9:00 AM"],
    //   location: "Alhuda Mosque",
    //   additionalInfo: [
    //     "Please arrive 30 minutes before prayer time",
    //     "Bring your own prayer mat",
    //     "Takbeer will start 15 minutes before prayer",
    //   ],
    //   type: "eid",
    // },
  ];

  const renderPrayerTimes = (announcement: Announcement) => {
    if (
      announcement.type === "ramadan" &&
      announcement.times &&
      typeof announcement.times !== "string"
    ) {
      const ramadanTimes = announcement.times as RamadanTimes;
      return (
        <>
          {ramadanTimes.taraweeh && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Taraweeh Starts: {ramadanTimes.taraweeh}</span>
            </div>
          )}
          {ramadanTimes.tahajud && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Tahajud Starts: {ramadanTimes.tahajud}</span>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        {Array.isArray(announcement.times) &&
          announcement.times.map((time, index) => (
            <div key={index} className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{`${
                index === 0 ? "First" : "Second"
              } Prayer: ${time}`}</span>
            </div>
          ))}
      </>
    );
  };

  const renderSpecialMessage = (announcement: Announcement) => {
    if (announcement.type === "ramadan" || announcement.type === "eid") {
      return (
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {announcement.type === "ramadan"
                ? "First day of Ramadan: "
                : "Eid Day: "}
              {announcement.date}
            </span>
          </div>
          <p className="text-gray-600 text-sm italic">
            {announcement.description}
          </p>
          {announcement.type === "eid" &&
            Array.isArray(announcement.additionalInfo) && (
              <div className="mt-4 bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-800 mb-2">
                  Important Information:
                </h5>
                <ul className="list-disc pl-4 space-y-1">
                  {announcement.additionalInfo.map((info, index) => (
                    <li key={index} className="text-sm text-green-700">
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      );
    }

    if (announcement.type === "dugsi") {
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{announcement.schedule?.days}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{announcement.schedule?.times}</span>
            </div>
            {announcement.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{announcement.location}</span>
              </div>
            )}
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="space-y-4">
              {announcement.programs?.map((program, index) => (
                <div
                  key={index}
                  className="border-b border-green-100 last:border-0 pb-3 last:pb-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-green-700" />
                    <h5 className="font-medium text-green-800">
                      {program.name}
                    </h5>
                  </div>
                  <div className="text-sm text-green-700 ml-6">
                    <p>{program.time}</p>
                    {program.levels && (
                      <p className="text-green-600">
                        Levels: {program.levels.join(", ")}
                      </p>
                    )}
                    {program.topics && (
                      <p className="text-green-600">
                        Topics: {program.topics.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Megaphone className="h-6 w-6 text-green-700" />
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Important Announcements
          </h2>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg shadow-sm border-l-4 border-green-600 p-6"
            >
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {announcement.title}
                  </h3>

                  {renderSpecialMessage(announcement)}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {renderPrayerTimes(announcement)}
                    {announcement.type !== "dugsi" && announcement.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{announcement.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {announcement.alert && (
                  <div className="bg-amber-50 rounded-lg p-3 mt-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-700">
                        {announcement.alert.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No current announcements
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcement;
