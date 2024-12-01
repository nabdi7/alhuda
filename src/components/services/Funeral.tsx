import React from "react";
import { Phone, Clock, Heart, Users } from "lucide-react";
import PageHeader from "../header/PageHeader";

const Funeral = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white">
      <PageHeader title="Funeral" breadcrumb="Funeral" />

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            &quot;Indeed, we belong to Allah, and indeed, to Him we will
            return&quot;
          </p>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+12536322310"
                className="flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-colors w-full sm:w-auto justify-center"
              >
                <Phone className="h-5 w-5" />
                24/7 Support: (253) 632-2310
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Process Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-16">
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
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-emerald-700 transform group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-medium mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Funeral Process Section */}
      <section className="py-24 max-w-4xl mx-auto">
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
                  "Important Note: We do NOT provide Ghusl services in the mosque. Contact our team for recommended locations and assistance.",
                note: true,
              },
              {
                step: "3",
                title: "Grave Site Options",
                description: "We recommend two Muslim cemetery options:",
                subSteps: [
                  {
                    title: "House of Mercy - All Muslim Cemetery",
                    description:
                      "Located in Covington. Contact: (206) 818-3964",
                  },
                  {
                    title: "Muslim Section at Woodlawn Cemetery",
                    description:
                      "Located in Snohomish. Contact: (425) 268-9459 or (360) 568-5560",
                  },
                ],
              },
              {
                step: "4",
                title: "Kafan (Shrouding)",
                description:
                  "The body is wrapped in clean, white cloth according to Islamic tradition.",
              },
              {
                step: "5",
                title: "Janazah Prayer",
                description:
                  "Funeral prayer is performed at the mosque with the community.",
              },
              {
                step: "6",
                title: "Burial",
                description:
                  "We assist with the burial process following Islamic guidelines.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group hover:bg-emerald-50 rounded-xl p-4 transition-colors duration-300"
              >
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <span className="text-lg font-medium text-emerald-700">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                    <p
                      className={`text-gray-600 ${
                        step.note ? "text-red-600 font-semibold" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                    {step.subSteps && (
                      <div className="mt-4 space-y-2">
                        {step.subSteps.map((subStep, subIndex) => (
                          <div
                            key={subIndex}
                            className="bg-emerald-50 p-3 rounded-lg"
                          >
                            <h4 className="font-medium text-emerald-900">
                              {subStep.title}
                            </h4>
                            <p className="text-gray-700 text-sm">
                              {subStep.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Funeral;
