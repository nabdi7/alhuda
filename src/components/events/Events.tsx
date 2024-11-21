"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import recurringEventsData from "../../lib/recurringEvents.json";
import regularEventsData from "../../lib/regularEvents.json";
import PageHeader from "../header/PageHeader";
const Events = () => {
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

  return (
    <>
    <PageHeader title="Events" breadcrumb="Events" />
    <section className="bg-gray-100 py-12">
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

      {/* upcoming events */}



      {/* ongoing events */}



    </section>

    </>
  );
};

export default Events;
