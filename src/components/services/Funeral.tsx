import React from "react";
import { Phone, Clock, MapPin, Heart, Users, ArrowRight } from "lucide-react";
import Cta from "../cta/Cta";
import PageHeader from "../header/PageHeader";

const Funeral = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section with Gradient */}
      {/* <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-medium mb-6">
              إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
            </h1>
            <p className="text-xl text-emerald-50 mb-8">
              &quot;Indeed, we belong to Allah, and indeed, to Him we will
              return&quot;
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors w-full sm:w-auto justify-center"
                >
                  <Phone className="h-5 w-5" />
                  24/7 Support: (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <PageHeader title="Funeral" breadcrumb="Funeral" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Process Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto -mt-16">
          {[
            {
              title: "Available 24/7",
              description: "Immediate assistance and support whenever needed",
              icon: Clock,
            },
            {
              title: "Complete Services",
              description: "Full Islamic funeral and burial services",
              icon: Heart,
            },
            {
              title: "Community Support",
              description: "Janazah prayer with the community",
              icon: Users,
            },
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Funeral Process Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-medium mb-8">Funeral Process</h2>
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Initial Contact",
                  description:
                    "Our team will guide you through the necessary steps and arrange for transportation.",
                },
                {
                  step: "2",
                  title: "Ghusl (Ritual Washing)",
                  description:
                    "Performed by trained members of the same gender in our dedicated facility.",
                },
                {
                  step: "3",
                  title: "Kafan (Shrouding)",
                  description:
                    "The body is wrapped in clean, white cloth according to Islamic tradition.",
                },
                {
                  step: "4",
                  title: "Janazah Prayer",
                  description:
                    "Funeral prayer is performed at the mosque with the community.",
                },
                {
                  step: "5",
                  title: "Burial",
                  description:
                    "We assist with the burial process following Islamic guidelines.",
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-medium text-emerald-700">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Cta />
    </div>
  );
};

export default Funeral;
