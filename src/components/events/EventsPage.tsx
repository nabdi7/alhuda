"use client";
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Clock,
  CalendarDays,
} from "lucide-react";
import recurringEventsData from "../../lib/recurringEvents.json";
import regularEventsData from "../../lib/regularEvents.json";
import PageHeader from "../header/PageHeader";
import Image from "next/image";
const EventCard = ({ date, title, image, time }) => (
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
      <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={image || "/api/placeholder/400/300"}
          alt={title}
          width={400} 
      height={300} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 line-clamp-2">
        {title}
      </h3>
      <button
        className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white 
        px-6 py-3 rounded-lg hover:from-green-800 hover:to-green-900
        transition-all duration-300 flex items-center justify-center gap-2 
        active:scale-95 hover:shadow-lg"
      >
        <CalendarCheck className="w-5 h-5" />
        View Details
      </button>
    </div>
  </div>
);

const EventsPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

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

  const getRegularEvents = (date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    try {
      return regularEventsData.events[year]?.[month]?.[day] || [];
    } catch (error) {
      console.error("Error accessing regular events:", error);
      return [];
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const mondayBasedFirstDay = firstDay === 0 ? 7 : firstDay;

    const daysArray = [];
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

  const getEventsForDate = (date) => {
    if (!date) return [];

    const events = [];

    // Get regular events for the specific date
    const regularEvents = getRegularEvents(date);
    events.push(...regularEvents);

    // Check recurring events
    recurringEventsData.events.forEach((event) => {
      if (event.type === "weekly") {
        const mondayBasedDay = date.getDay() === 0 ? 7 : date.getDay();
        if (mondayBasedDay === event.dayOfWeek) {
          events.push({
            time: event.time,
            title: event.title,
            recurring: true,
          });
        }
      }
    });

    return events;
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateSelect = (day) => {
    if (day.currentMonth) {
      setSelectedDate(day.day);
    }
  };

  // Get upcoming events
  const getUpcomingEvents = () => {
    const events = [];
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 1);

    // Add regular events
    Object.keys(regularEventsData.events).forEach((year) => {
      Object.keys(regularEventsData.events[year]).forEach((month) => {
        Object.keys(regularEventsData.events[year][month]).forEach((day) => {
          const eventDate = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          if (eventDate >= today && eventDate <= threeMonthsFromNow) {
            regularEventsData.events[year][month][day].forEach((event) => {
              events.push({
                date: eventDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                }),
                title: event.title,
                time: event.time,
                image: event.image,
              });
            });
          }
        });
      });
    });

    // Sort events by date
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get previous events
  const getPreviousEvents = () => {
    const events = [];
    const today = new Date();
    
    // Get the first day of the previous month
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  
    // Add regular events
    Object.keys(regularEventsData.events).forEach((year) => {
      Object.keys(regularEventsData.events[year]).forEach((month) => {
        Object.keys(regularEventsData.events[year][month]).forEach((day) => {
          const eventDate = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          
          // Check if the event is within the last month
          if (eventDate >= lastMonth && eventDate < today) {
            regularEventsData.events[year][month][day].forEach((event) => {
              events.push({
                date: eventDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                }),
                title: event.title,
                time: event.time,
                image: event.image,
              });
            });
          }
        });
      });
    });
  
    // Sort events by date in descending order
    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Memoized event calculations
  const selectedDateEvents = useMemo(
    () =>
      getEventsForDate(
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          selectedDate
        )
      ),
    [currentMonth, selectedDate]
  );

  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);
  const previousEvents = useMemo(() => getPreviousEvents(), []);

  return (
    <section className="bg-green-50">
      <PageHeader title="Events" breadcrumb="Events" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Upcoming Events */}
        <div className="">
          <h1
            className="text-4xl font-extrabold pb-12 text-center text-gray-800 
            bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800"
          >
            Upcoming Events
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                date={event.date}
                title={event.title}
                time={event.time}
                image={event.image}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] py-12">
          {/* Calendar Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={previousMonth}
                className="text-gray-600 hover:text-green-700 
                  p-2 hover:bg-green-50 rounded-full 
                  transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <h2 className="text-gray-800 text-lg font-semibold">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>

              <button
                onClick={nextMonth}
                className="text-gray-600 hover:text-green-700 
                  p-2 hover:bg-green-50 rounded-full 
                  transition-colors"
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
                    className={`min-h-[80px] p-1 relative border rounded-md text-left
                    transition-all duration-300
                    ${
                      day.currentMonth
                        ? "hover:bg-green-50 hover:shadow-sm"
                        : "bg-gray-50 opacity-50"
                    }
                    ${
                      selectedDate === day.day && day.currentMonth
                        ? " border-green-700"
                        : "border-gray-200"
                    } 
                  `}
                  >
                    <span
                      className={`
                        absolute top-1 right-1 
                        w-6 h-6 flex items-center justify-center 
                        rounded-full text-sm font-semibold
                        ${day.currentMonth ? "text-gray-800" : "text-gray-400"}
                        ${
                          selectedDate === day.day && day.currentMonth
                            ? "bg-green-700 text-white"
                            : ""
                        }
                      `}
                    >
                      {day.day}
                    </span>
                    {/* Show event dots on mobile, times on desktop */}
                    <div className="mt-6 space-y-1">
                      {day.currentMonth && dayEvents.length > 0 && (
                        <>
                          {/* Desktop view with times */}
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
                          {/* Mobile view with dots */}
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

          {/* Events Section */}
          <div
            className="
            bg-gradient-to-br from-green-700 to-green-600 
            text-white rounded-2xl p-8 
            shadow-lg shadow-green-300/50
          "
          >
            <h3
              className="
              text-2xl font-bold mb-6 
              border-b border-white/20 pb-4
            "
            >
              Events on {selectedDate}th {months[currentMonth.getMonth()]}
            </h3>

            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <div
                  key={index}
                  className="
                    bg-white/10 rounded-lg p-4 mb-4 
                    hover:bg-white/20 transition-colors
                    group
                  "
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="
                        w-2 h-2 bg-white rounded-full 
                        group-hover:animate-ping
                      "
                      ></div>
                      <span className="text-sm">{event.time}</span>
                      {event.recurring && (
                        <span
                          className="
                          bg-white/20 text-xs px-2 py-0.5 
                          rounded-full
                        "
                        >
                          Recurring
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-white">{event.title}</h4>
                </div>
              ))
            ) : (
              <div
                className="
                text-white/80 text-center 
                bg-white/10 rounded-lg p-8
              "
              >
                <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No events on this day</p>
              </div>
            )}
          </div>
        </div>

        {/* previous events */}
        <div className="py-12">
          <h1
            className="text-4xl font-extrabold mb-12 text-center text-gray-800 
            bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800"
          >
            Previous Events
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousEvents.map((event, index) => (
              <EventCard
                key={index}
                date={event.date}
                title={event.title}
                time={event.time}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
