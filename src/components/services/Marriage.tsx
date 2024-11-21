"use client";
import React, { useState } from "react";
import {
  Calendar,
  Heart,
  Users,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Clock,
  MapPin,
  Book,
} from "lucide-react";
import PageHeader from "../header/PageHeader";

const Marriage = () => {
  const [activeSection, setActiveSection] = useState("about");

  const services = [
    {
      title: "Nikah Ceremony",
      description:
        "Sacred marriage ceremony conducted by our certified Imams in our beautiful prayer hall",
      icon: Heart,
    },
    {
      title: "Pre-Marriage Counseling",
      description:
        "Islamic guidance sessions to build strong foundations for your marriage",
      icon: Users,
    },
    {
      title: "Marriage Certificate",
      description:
        "Official documentation and legal marriage registration services",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Animated Background */}
      {/* <section className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-800 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: "scale(${Math.random() + 0.5})",
                opacity: Math.random() * 0.3,
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 animate-fade-in">
              Begin Your Journey Together
            </h1>
            <p className="text-xl text-green-50 mb-12 leading-relaxed">
              Let us guide you through one of life&apos;s most beautiful moments with
              Islamic traditions and values
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group bg-white text-green-700 px-8 py-4 rounded-full font-medium hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
                <ChevronRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section> */}
      <PageHeader title="Marriage Service" breadcrumb="Marriage" />

      {/* Interactive Navigation */}
      {/* <div className="sticky top-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            {["about", "services", "requirements"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 font-medium transition-all duration-300 border-b-2 ${
                  activeSection === section
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-600 hover:text-green-700"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Services Section with Hover Effects */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
           
              <service.icon className="w-12 h-12 text-green-700 mb-6 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <button className="mt-6 text-green-700 font-medium group-hover:underline">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-16">
            Your Journey to Marriage
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200" />
            {[
              {
                title: "Initial Consultation",
                description:
                  "Meet with our marriage counselor to discuss your plans",
                icon: Users,
                time: "Week 1",
              },
              {
                title: "Documentation",
                description:
                  "Submit required documents and complete registration",
                icon: Calendar,
                time: "Week 2",
              },
              {
                title: "Pre-Marriage Course",
                description:
                  "Attend our comprehensive marriage preparation program",
                icon: Book,
                time: "Week 3-4",
              },
              {
                title: "Nikah Ceremony",
                description: "Your special day conducted by our Imam",
                icon: Heart,
                time: "The Big Day",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <div className="mt-4 text-green-700 font-medium flex items-center gap-2 justify-end">
                      <Clock className="w-4 h-4" />
                      {step.time}
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-green-700 text-white">
                  <step.icon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-medium mb-2">Need Assistance?</h2>
                <p className="text-emerald-50">
                  We&apos;re here to help you through this difficult time.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <a
                  href="#location"
                  className="flex items-center gap-2 bg-emerald-800 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors border border-emerald-700"
                >
                  <MapPin className="h-5 w-5" />
                  Our Location
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marriage;
