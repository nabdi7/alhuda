import React from "react";
import { Calendar, Heart, Users, Phone, Clock, MapPin } from "lucide-react";
import PageHeader from "../header/PageHeader";

const Marriage = () => {
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
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <PageHeader title="Marriage Services" breadcrumb="Marriage Services" />

      {/* New Introductory Section */}
      <section className="py-24 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <h2 className="text-3xl font-bold text-green-900 mb-6">
            Islamic Marriage Services
          </h2> */}
          <p className="text-lg text-gray-700 leading-relaxed">
            Alhuda Islamic Center provides marriage religious services to
            Muslims according to Islamic principles. If you want to pursue a
            halal marriage that honors Islamic traditions and values, our center
            offers comprehensive support throughout your matrimonial journey.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-green-700 transform group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-16">
            Contact Our Marriage Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Office Hours",
                description:
                  "Monday - Friday: 9 AM - 5 PM\nSaturday: 10 AM - 2 PM",
                icon: Clock,
              },
              {
                title: "Contact Information",
                description:
                  "Phone: (253) 632-2310\nEmail: info@alhudakent.org",
                icon: Phone,
              },
              {
                title: "Visit Us",
                description:
                  "25650 101st Ave SE, \nKent, WA 98030",
                icon: MapPin,
              },
            ].map((contact) => (
              <div
                key={contact.title}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <contact.icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-4">{contact.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Marriage;
