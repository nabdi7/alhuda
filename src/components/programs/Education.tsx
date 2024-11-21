"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ChevronRight,
  Book,
  Globe,
  Shield,
  Scroll,
  MessageCircle,
  Star,
} from "lucide-react";
import Link from "next/link";
import Cta from "../cta/Cta";
import PageHeader from "../header/PageHeader";

const Education = () => {
  const [hoveredClass, setHoveredClass] = useState(null);

  const classDetails = [
    {
      icon: Clock,
      title: "Quran Recitation",
      description:
        "Learn proper Tajweed and Quranic recitation techniques in an engaging class setting.",
      time: "Saturday & Sunday, 10:00 AM - 11:30 AM",
      registerLink: "/register/quran",
      level: "All Ages",
    },
    {
      icon: Calendar,
      title: "Islamic Studies",
      description:
        "Explore the fundamentals of Islam, including Seerah, Fiqh, and Hadith, tailored for young learners.",
      time: "Saturday & Sunday, 12:00 PM - 1:30 PM",
      registerLink: "/register/islamic-studies",
      level: "7-16 Years",
    },
    {
      icon: Globe,
      title: "Arabic Language",
      description:
        "Develop a strong foundation in reading, writing, and speaking Arabic in a structured environment.",
      time: "Saturday & Sunday, 2:00 PM - 3:30 PM",
      registerLink: "/register/arabic",
      level: "6-18 Years",
    },
    {
      icon: Book,
      title: "Tafsir Sessions",
      description:
        "Understand the deeper meanings of the Quran with our engaging Tafsir classes.",
      time: "Saturday & Sunday, 4:00 PM - 5:30 PM",
      registerLink: "/register/tafsir",
      level: "12-18 Years",
    },
    {
      icon: Scroll,
      title: "Hadith Sciences",
      description:
        "Deep dive into Prophetic traditions and their contextual understanding.",
      time: "Saturday, 3:00 PM - 4:30 PM",
      registerLink: "/register/hadith",
      level: "14-18 Years",
    },
    {
      icon: Shield,
      title: "Islamic Ethics",
      description:
        "Develop moral character and understanding of Islamic principles in modern context.",
      time: "Sunday, 5:00 PM - 6:30 PM",
      registerLink: "/register/ethics",
      level: "10-16 Years",
    },
  ];

  return (
    <section className="pb-20 bg-gray-50">
      <PageHeader title="Weekend Islamic School" breadcrumb="Islamic School" />

      {/* Class Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classDetails.map((classItem, index) => {
          const Icon = classItem.icon;
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
                <div
                  className={`
                  bg-green-100 p-4 rounded-full transition-all
                  ${isHovered ? "bg-green-200" : "bg-green-100"}
                `}
                >
                  <Icon
                    className={`
                    h-8 w-8 transition-colors
                    ${isHovered ? "text-green-700" : "text-green-600"}
                  `}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {classItem.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 h-20">{classItem.description}</p>
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
                      : "bg-green-50 text-green-700"
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

      <Cta />
    </section>
  );
};

export default Education;
