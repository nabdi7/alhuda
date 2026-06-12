"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Clock,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";
import PageHeader from "../header/PageHeader";
import { getPrimaryEventData } from "../../../backend/readFB";

interface FirebaseEvent {
  id: string;
  title: string;
  date: any;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  // image?: string;
  isRecurring?: boolean;
  endDate?: any;
}

interface CalendarDay {
  day: number;
  currentMonth: boolean;
  date: Date;
}

interface EventCardProps {
  date: string;
  title: string;
  image?: string;
  time?: string;
  description?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  title,
  image,
  time,
  description,
}) => (
  <div
    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 
    hover:shadow-xl hover:-translate-y-2 group"
  >
    <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-4 px-5 flex justify-between items-center">
      <span className="font-semibold text-sm">{date}</span>
      {time && (
        <div className="flex items-center gap-1 text-xs opacity-80">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      )}
    </div>
    <div className="p-5">
      {/* <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={image || "/api/placeholder/400/300"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div> */}
      <h3 className="text-xl font-bold mb-4 text-gray-800 line-clamp-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{description}</p>
      )}
      {/* <button
        className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white 
        px-6 py-3 rounded-lg hover:from-green-800 hover:to-green-900
        transition-all duration-300 flex items-center justify-center gap-2 
        active:scale-95 hover:shadow-lg"
      >
        <CalendarCheck className="w-5 h-5" />
        View Details
      </button> */}
    </div>
  </div>
);

const EventsPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate(),
  );
  const [firebaseEvents, setFirebaseEvents] = useState<FirebaseEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const months: string[] = [
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

  const daysOfWeek: string[] = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  useEffect(() => {
    getPrimaryEventData()
      .then((snapshot) => {
        const events: FirebaseEvent[] = [];
        snapshot.forEach((doc) =>
          events.push({ id: doc.id, ...doc.data() } as FirebaseEvent),
        );
        setFirebaseEvents(events);
      })
      .catch((err) => console.error("Failed to load events", err))
      .finally(() => setLoading(false));
  }, []);

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const mondayBasedFirstDay = firstDay === 0 ? 7 : firstDay;

    const daysArray: CalendarDay[] = [];
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

  const checkDST = useCallback((date: Date): boolean => {
    const jan = new Date(date.getFullYear(), 0, 1);
    return date.getTimezoneOffset() < jan.getTimezoneOffset();
  }, []);

  const getEventsForDate = useCallback(
    (date: Date): { time: string; title: string; recurring?: boolean }[] => {
      if (!date) return [];

      const events: { time: string; title: string; recurring?: boolean }[] = [];

      // Falah Islamic School — Monday to Thursday
      const dayOfWeek = date.getDay();
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

      // Firebase events
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
          description: event.description,
          recurring: event.isRecurring ?? false,
        }));

      events.push(...firebaseFiltered);
      return events;
    },
    [firebaseEvents],
  );

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

  const handleDateSelect = (day: CalendarDay) => {
    if (day.currentMonth) setSelectedDate(day.day);
  };

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // Upcoming events: today onwards, next month
  const upcomingEvents = useMemo((): EventCardProps[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    return firebaseEvents
      .filter((event) => {
        if (!event.date) return false;
        const eventDate = new Date(event.date.seconds * 1000);
        return eventDate >= today && eventDate <= oneMonthFromNow;
      })
      .map((event) => {
        const eventDate = new Date(event.date.seconds * 1000);
        return {
          date: eventDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          title: event.title,
          time: `${event.startTime} - ${event.endTime}`,
          description: event.description,
          // image: event.image,
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [firebaseEvents]);

  // Previous events: last month up to today
  const previousEvents = useMemo((): EventCardProps[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    return firebaseEvents
      .filter((event) => {
        if (!event.date) return false;
        const eventDate = new Date(event.date.seconds * 1000);
        return eventDate >= lastMonth && eventDate < today;
      })
      .map((event) => {
        const eventDate = new Date(event.date.seconds * 1000);
        return {
          date: eventDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          title: event.title,
          time: `${event.startTime} - ${event.endTime}`,
          description: event.description,
          // image: event.image,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [firebaseEvents]);

  const selectedDateEvents = useMemo(
    () =>
      getEventsForDate(
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          selectedDate,
        ),
      ),
    [currentMonth, selectedDate, getEventsForDate],
  );

  return (
    <section className="bg-green-50">
      <PageHeader title="Events" breadcrumb="Events" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Upcoming Events */}
        <div>
          <h1 className="text-4xl font-extrabold pb-12 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800">
            Upcoming Events
          </h1>
          {loading ? (
            <p className="text-center text-gray-400 pb-12">Loading events...</p>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-400 pb-12">
              No upcoming events.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={index}
                  date={event.date}
                  title={event.title}
                  time={event.time}
                  description={event.description}
                  image={event.image}
                />
              ))}
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] py-12">
          {/* Events panel */}
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

          {/* Calendar grid */}
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

        {/* Previous Events */}
        <div className="py-12">
          <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800">
            Previous Events
          </h1>
          {loading ? (
            <p className="text-center text-gray-400">Loading events...</p>
          ) : previousEvents.length === 0 ? (
            <p className="text-center text-gray-400">No previous events.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {previousEvents.map((event, index) => (
                <EventCard
                  key={index}
                  date={event.date}
                  title={event.title}
                  time={event.time}
                  description={event.description}
                  // image={event.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
