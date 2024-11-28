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
      <section className="py-16 bg-green-50">
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

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <service.icon className="w-8 h-8 text-green-700 mb-6 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-16">
            Contact Our Marriage Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
                  "Phone: (555) 123-4567\nEmail: marriage@islamiccenter.org",
                icon: Phone,
              },
              {
                title: "Visit Us",
                description:
                  "123 Islamic Way\nSpringfield, IL 62701\nUnited States",
                icon: MapPin,
              },
            ].map((contact) => (
              <div
                key={contact.title}
                className=" text-center group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <contact.icon className="w-10 h-10 text-green-700 mx-auto mb-6" />
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
