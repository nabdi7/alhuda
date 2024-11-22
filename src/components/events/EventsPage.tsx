"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import recurringEventsData from "../../lib/recurringEvents.json";
import regularEventsData from "../../lib/regularEvents.json";
import PageHeader from "../header/PageHeader";
const EventCard = ({ date, title, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="bg-green-700 text-white py-3 px-4 text-center font-semibold">
      {date}
    </div>
    <div className="p-4">
      <img
        src={image || "/api/placeholder/400/300"}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <button className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-colors">
        VIEW DETAILS
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

  // Get events for selected date
  const selectedDateEvents = getEventsForDate(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate)
  );

  // Function to get all upcoming events
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
              });
            });
          }
        });
      });
    });

    // Sort events by date
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get upcoming events
  const upcomingEvents = getUpcomingEvents();

  //   previous events
  const getPreviousEvents = () => {
    const events = [];
    const today = new Date();

    // Add regular events
    Object.keys(regularEventsData.events).forEach((year) => {
      Object.keys(regularEventsData.events[year]).forEach((month) => {
        Object.keys(regularEventsData.events[year][month]).forEach((day) => {
          const eventDate = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          if (eventDate < today) {
            regularEventsData.events[year][month][day].forEach((event) => {
              events.push({
                date: eventDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                }),
                title: event.title,
                time: event.time,
              });
            });
          }
        });
      });
    });

    // Sort events by date
    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  const previousEvents = getPreviousEvents();

  return (
    <>
      <PageHeader title="Events" breadcrumb="Events" />
      <section className="bg-gray-100 py-12">
        {/* upcoming events */}
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Upcoming Events
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                date={event.date}
                title={event.title}
                image={event.image}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8 p-6 ">
          {/* Calendar Section */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={previousMonth}
                className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h2 className="text-gray-600 text-lg font-semibold">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>

              <button
                onClick={nextMonth}
                className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
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

            <div className="grid grid-cols-7 gap-4">
              {getDaysInMonth(currentMonth).map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    className={`h-10 flex items-center justify-center relative 
                  ${
                    day.currentMonth
                      ? "hover:bg-green-700"
                      : "pointer-events-none"
                  }
                  ${day.currentMonth ? "text-gray-900" : "text-gray-400"}
                  ${
                    selectedDate === day.day && day.currentMonth
                      ? "bg-green-700"
                      : ""
                  }
                  rounded-md transition-colors`}
                  >
                    <span className="relative z-10">{day.day}</span>
                    {dayEvents.length > 0 && day.currentMonth && (
                      <div
                        className={`w-2 h-2 rounded-full absolute -bottom-1
                    ${
                      selectedDate === day.day ? "bg-green-700" : "bg-green-700"
                    }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Section */}
          <div className="w-full md:w-96 bg-green-700 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-6 ">
              EVENTS FOR {months[currentMonth.getMonth()].toUpperCase()}
            </h3>
            <div className="inline-block border border-white px-3 py-1 mb-8 ">
              {selectedDate}th
            </div>

            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <div key={index} className="mb-8">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    {event.time}
                    {event.recurring && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                        Recurring
                      </span>
                    )}
                  </div>
                  <div className="font-medium">{event.title}</div>
                </div>
              ))
            ) : (
              <div className="text-white/90">
                No events scheduled for this day
              </div>
            )}
          </div>
        </div>

        {/* previous events */}
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Previous Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousEvents.map((event, index) => (
              <EventCard
                key={index}
                date={event.date}
                title={event.title}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
