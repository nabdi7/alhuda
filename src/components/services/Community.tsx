"use client";
import React, { useState } from "react";
import { Globe } from "lucide-react";
import PageHeader from "../header/PageHeader";

const Community = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const supportResources = [
    {
      category: "Addiction Recovery",
      resources: [
        {
          title: "Washington Recovery Help Line",
          description:
            "Help for Substance Abuse, Problem Gambling, & Mental Health.",
          contacts: [
            {
              email: "recovery@crisisconnections.org",
              phone: "(866) 789-1511",
            },
          ],
          website: "https://www.warecoveryhelpline.org/",
        },
      ],
    },
    {
      category: "Mental Health",
      resources: [
        {
          title: "Naseeha Hotline",
          description:
            "Naseeha is a Muslim mental health helpline offering culturally sensitive and faith-informed counseling to Muslims and individuals of all beliefs.",
          contacts: [{ email: "info@naseeha.net", phone: "(866) 627-3342" }],
          website: "https://www.naseeha.org/",
        },
      ],
    },
    {
      category: "Crisis Intervention",
      resources: [
        {
          title: "National Suicide Prevention Lifeline",
          description:
            "Immediate support for individuals experiencing emotional distress, trauma, or immediate safety concerns",
          contacts: [{ email: "", phone: "988" }],
          website: "https://988lifeline.org/",
        },
      ],
    },
    {
      category: "Crisis Intervention",
      resources: [
        {
          title: "Crisis Text Line",
          description:
            "Text-based support for individuals experiencing emotional distress, providing immediate mental health crisis assistance",
          contacts: [{ email: "", phone: "Text to 741741" }],
          website: "https://www.crisistextline.org/",
        },
      ],
    },
    {
      category: "Counseling & Therapy",
      resources: [
        {
          title: "Mindful Therapy Group",
          description:
            "Provides comprehensive and compassionate mental health therapy and counseling services.",
          contacts: [
            {
              email: "frontdesk.wa@mindfultherapygroup.com",
              phone: "(425) 292-8939",
            },
          ],
          website: "https://mindfultherapygroup.com/",
        },
      ],
    },
  ];

  const categories = [
    "All",
    ...new Set(supportResources.map((resource) => resource.category)),
  ];

  const filteredResources =
    activeCategory === "All"
      ? supportResources
      : supportResources.filter(
          (resource) => resource.category === activeCategory
        );

  return (
    <section className="bg-gray-50">
      <PageHeader
        title="Community Resources"
        breadcrumb="Community Resources"
      />
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-16 ">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-green-700 text-white"
                    : "bg-green-50 text-green-800 hover:bg-green-100"
                }
              `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resourceGroup, groupIndex) => {
              return resourceGroup.resources.map((resource, resourceIndex) => (
                <div
                  key={`${groupIndex}-${resourceIndex}`}
                  className="bg-white rounded-xl shadow-md p-6 border border-green-50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-900">
                      {resource.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="space-y-3 mb-5">
                    <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider">
                      Contacts
                    </h4>
                    {resource.contacts.map((contact, contactIndex) => (
                      <div
                        key={contactIndex}
                        className="flex justify-between items-center bg-green-50 p-3 rounded-lg"
                      >
                        <div>
                          {contact.email && (
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-xs text-gray-600 block mb-1 hover:text-green-800 hover:underline"
                            >
                              {contact.email}
                            </a>
                          )}
                          <a
                            href={`tel:${contact.phone.replace(/\D/g, "")}`}
                            className="text-xs text-gray-600 mt-10"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Website Link */}
                  {resource.website && (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                      w-full block text-center 
                      bg-green-700 text-white 
                      py-2.5 rounded-lg 
                      text-sm 
                      hover:bg-green-800 
                      transition-colors
                    "
                    >
                      <Globe className="w-4 h-4 inline-block mr-2 -mt-1" />
                      Visit Website
                    </a>
                  )}
                </div>
              ));
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Community;
