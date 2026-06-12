"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { getPrimaryEventData } from "../../../backend/readFB";

interface EventItem {
  id: string;
  title: string;
  date: any;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image?: string;
  isRecurring?: boolean;
  endDate?: any;
}

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate(),
  );
  const [firebaseEvents, setFirebaseEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getPrimaryEventData();
      const events: EventItem[] = [];
      snapshot.forEach((doc) =>
        events.push({ id: doc.id, ...doc.data() } as EventItem),
      );
      setFirebaseEvents(events);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const getDaysInMonth = (
    date: Date,
  ): { day: number; currentMonth: boolean; date: Date }[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const mondayBasedFirstDay = firstDay === 0 ? 7 : firstDay;

    const daysArray: { day: number; currentMonth: boolean; date: Date }[] = [];
    for (let i = 1; i < mondayBasedFirstDay; i++) {
      const prevDate = new Date(year, month, 1 - i);
      daysArray.unshift({
        day: prevDate.getDate(),
        currentMonth: false,
        date: prevDate,
      });
    }
    for (let i = 1; i <= days; i++) {
      daysArray.push({
        day: i,
        currentMonth: true,
        date: new Date(year, month, i),
      });
    }
    return daysArray;
  };

  const checkDST = useCallback((date: Date = new Date()): boolean => {
    const jan = new Date(date.getFullYear(), 0, 1);
    return date.getTimezoneOffset() < jan.getTimezoneOffset();
  }, []);

  const getEventsForDate = (
    date: Date | null,
  ): { time: string; title: string; recurring?: boolean }[] => {
    if (!date) return [];

    const events: { time: string; title: string; recurring?: boolean }[] = [];

    // Falah Islamic School — Monday to Thursday
    const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      events.push({
        time: "9:00 am - 1:00 pm",
        title: "Falah Islamic School",
        recurring: true,
      });
    }

    // Jumu'ah — every Friday, DST-aware
    if (dayOfWeek === 5) {
      const dst = checkDST(date);
      events.push({
        time: dst ? "1:30 pm" : "12:45 pm",
        title: "Jumu'ah 1st Prayer",
        recurring: true,
      });
      events.push({
        time: dst ? "2:30 pm" : "1:30 pm",
        title: "Jumu'ah 2nd Prayer",
        recurring: true,
      });
    }

    const firebaseFiltered = firebaseEvents
      .filter((event) => {
        if (!event.date) return false;

        if (event.isRecurring && event.endDate) {
          const start = new Date(event.date.seconds * 1000);
          const end = new Date(event.endDate.seconds * 1000);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
          const check = new Date(date);
          check.setHours(12, 0, 0, 0);
          return check >= start && check <= end;
        }

        const eventDate = new Date(event.date.seconds * 1000);
        return (
          eventDate.getUTCFullYear() === date.getFullYear() &&
          eventDate.getUTCMonth() === date.getMonth() &&
          eventDate.getUTCDate() === date.getDate()
        );
      })
      .map((event) => ({
        time: `${event.startTime} - ${event.endTime}`,
        title: event.title,
        recurring: event.isRecurring ?? false,
      }));

    events.push(...firebaseFiltered);
    return events;
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateSelect = (day: {
    day: number;
    currentMonth: boolean;
    date: Date;
  }) => {
    if (day.currentMonth) {
      setSelectedDate(day.day);
    }
  };

  const selectedDateEvents = getEventsForDate(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate),
  );

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
          {/* Events Section */}
          <div className="bg-gradient-to-br from-green-700 to-green-600 text-white rounded-2xl p-8 shadow-lg shadow-green-300/50 order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">
              Events on {getOrdinal(selectedDate)}{" "}
              {months[currentMonth.getMonth()]}
            </h3>

            {loading ? (
              <div className="text-white/80 text-center bg-white/10 rounded-lg p-8">
                <p>Loading events...</p>
              </div>
            ) : selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-4 mb-4 hover:bg-white/20 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping" />
                      <span className="text-sm">{event.time}</span>
                      {event.recurring && (
                        <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                          Recurring
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-white">{event.title}</h4>
                </div>
              ))
            ) : (
              <div className="text-white/80 text-center bg-white/10 rounded-lg p-8">
                <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No events on this day</p>
              </div>
            )}
          </div>

          {/* Calendar Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 order-2 lg:order-1">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={previousMonth}
                className="text-gray-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <h2 className="text-gray-800 text-lg font-semibold">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>

              <button
                onClick={nextMonth}
                className="text-gray-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-sm font-medium text-gray-500 text-center"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentMonth).map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    className={`min-h-[80px] p-1 relative border rounded-md text-left transition-all duration-300
                      ${day.currentMonth ? "hover:bg-green-50 hover:shadow-sm" : "bg-gray-50 opacity-50"}
                      ${selectedDate === day.day && day.currentMonth ? "border-green-700" : "border-gray-200"}
                    `}
                  >
                    <span
                      className={`absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold
                        ${day.currentMonth ? "text-gray-800" : "text-gray-400"}
                        ${selectedDate === day.day && day.currentMonth ? "bg-green-700 text-white" : ""}
                      `}
                    >
                      {day.day}
                    </span>
                    <div className="mt-6 space-y-1">
                      {day.currentMonth && dayEvents.length > 0 && (
                        <>
                          <div className="hidden md:block space-y-1">
                            {dayEvents.map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="bg-green-100 text-green-800 text-xs p-1 rounded truncate"
                                title={`${event.time} - ${event.title}`}
                              >
                                {event.time}
                              </div>
                            ))}
                          </div>
                          <div className="flex md:hidden gap-0.5 flex-wrap">
                            {dayEvents.map((_, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
