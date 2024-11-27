"use client";
import React, { useState } from "react";
import {
  Clock,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import Cta from "../cta/Cta";
import PageHeader from "../header/PageHeader";

const Education = () => {
  const [hoveredClass, setHoveredClass] = useState(null);

  const classDetails = [
    {
      title: "Quran Recitation",
      description:
        "Learn proper Tajweed and Quranic recitation techniques in an engaging class setting.",
      time: "Saturday & Sunday, 10:00 AM - 11:30 AM",
      registerLink: "/register/quran",
      level: "All Ages",
    },
    {
      title: "Arabic Language",
      description:
        "Develop a strong foundation in reading, writing, and speaking Arabic in a structured environment.",
      time: "Saturday & Sunday, 2:00 PM - 3:30 PM",
      registerLink: "/register/arabic",
      level: "6-18 Years",
    },
    {
      title: "Tafsir Sessions",
      description:
        "Understand the deeper meanings of the Quran with our engaging Tafsir classes.",
      time: "Saturday & Sunday, 4:00 PM - 5:30 PM",
      registerLink: "/register/tafsir",
      level: "12-18 Years",
    },
  ];

  return (
    <section className="pb-20 bg-gray-50">
      <PageHeader
        title="Weekend Islamic School"
        breadcrumb="Weekend Islamic School"
      />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classDetails.map((classItem, index) => {
            const isHovered = hoveredClass === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredClass(index)}
                onMouseLeave={() => setHoveredClass(null)}
                className={`
                bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300
                ${isHovered ? "scale-105 shadow-xl" : "scale-100"}
              `}
              >
                <div className="flex items-center gap-4 mb-4">
                  
                  <h3 className="text-xl font-bold text-gray-900">
                    {classItem.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 h-20">
                  {classItem.description}
                </p>
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-green-600" />
                    <span>Level: {classItem.level}</span>
                  </div>
                </div>

                <Link
                  href={classItem.registerLink}
                  className={`
                  mt-4 w-full flex items-center justify-center gap-2 
                  ${
                    isHovered
                      ? "bg-green-700 text-white"
                      : "bg-green-700 text-white"
                  }
                  py-3 rounded-lg transition-all font-semibold
                  hover:bg-green-700 hover:text-white
                `}
                >
                  Register Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Cta />
    </section>
  );
};

export default Education;
