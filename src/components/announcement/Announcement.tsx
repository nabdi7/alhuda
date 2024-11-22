import React from "react";
import { Megaphone, Clock, MapPin, AlertCircle } from "lucide-react";

const Announcement = () => {
  const announcements = [
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
      title: "Ramadhan 2025",
      date: "Wednesday, April 10, 2024",
      times: ["8:30 PM"], // taraweeh starts
      additionalInfo:
        "Please bring your prayer mats. Light breakfast will be served after each prayer.",
      type: "ramadan",
    },
    {
      id: 3,
      title: "Eid ul-Fitr Prayer Times",
      date: "Wednesday, April 10, 2024",
      times: ["7:30 AM", "9:00 AM"],
      location: "Alhuda Mosque",
      additionalInfo:
        "Please bring your prayer mats. Light breakfast will be served after each prayer.",
      type: "eid",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
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

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>First Prayer: {announcement.times[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Second Prayer: {announcement.times[1]}</span>
                    </div>
                    {announcement.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{announcement.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Alert Section */}
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
    </div>
  );
};

export default Announcement;
