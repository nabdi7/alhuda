"use client";
import React, { useState } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  Search,
  Filter,
} from "lucide-react";
import PageHeader from "../header/PageHeader";

const Scholars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const teams = {
    board: {
      title: "Board Members",
      description:
        "Our dedicated board members who guide our organization's vision and strategy.",
      members: [
        {
          name: "Sheikh Ahmed Nuur",
          role: "Iman",
          image: "/abdirahin.JPG",
          facebook: "#",
          linkedin: "#",
          instagram: "#",
          email: "example@gmail.com",
          phone: "+1 (206) 390-6449",
          department: "leadership",
          bio: "Leading with vision and dedication to serve our community.",
        },
        {
          name: "Sheikh Abdirahin",
          role: "Vice President",
          image: "/board2.jpg",
          facebook: "#",
          linkedin: "#",
          instagram: "#",
          email: "example@gmail.com",
          phone: "+1 (206) 390-6449",
          department: "leadership",
          bio: "Creating meaningful experiences through well-organized events.",
        },
        {
          name: "Sheikh Abdirahin2",
          role: "Vice President",
          image: "/abdirahin.JPG",
          facebook: "#",
          linkedin: "#",
          instagram: "#",
          email: "example@gmail.com",
          phone: "+1 (555) 789-0123",
          department: "leadership",
          bio: "Empowering the next generation through education and mentorship.",
        },
        {
          name: "Sheikh Abdirahin",
          role: "Vice President",
          image: "/board2.jpg",
          facebook: "#",
          linkedin: "#",
          instagram: "#",
          email: "example@gmail.com",
          phone: "+1 (206) 390-6449",
          department: "leadership",
          bio: "Creating meaningful experiences through well-organized events.",
        },
      ],
    },
    volunteers: {
      title: "Volunteers",
      description:
        "Our amazing volunteers who dedicate their time and energy to support our cause.",
      members: [
        {
          name: "Sarah Ahmed",
          role: "Community Outreach",
          image: "/abdirahin.JPG",
          facebook: "#",
          linkedin: "#",
          instagram: "#",
          email: "example@gmail.com",
          phone: "+1 (555) 567-8901",
          department: "volunteers",
          bio: "Passionate about connecting with and serving our community.",
        },
      ],
    },
    tech: {
      title: "Tech Team",
      description:
        "Our talented tech professionals who maintain and improve our digital presence.",
      members: [
        {
          name: "Najib Abdi",
          role: "Web Designer",
          image: "/najib.jpg",
          facebook: "#",
          linkedin: "#",
          instagram: "#",
          email: "abdinajka@gmail.com",
          phone: "+1 (206) 883-3462",
          department: "Tech Team",
          bio: "Creating beautiful and intuitive digital experiences.",
          // url link
          linkUrl: "https://example.com/team/najib-abdi",
        },
      ],
    },
  };

  // Get all unique departments across all teams
  const allDepartments = [
    ...new Set(
      Object.values(teams)
        .flatMap((team) => team.members)
        .map((member) => member.department)
    ),
  ];

  const filterMembers = (members) => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" || member.department === filter;
      return matchesSearch && matchesFilter;
    });
  };

  // Function to get section title based on filter
  const getSectionTitle = (originalTitle) => {
    if (filter === "all") {
      return originalTitle;
    }
    return `${filter.charAt(0).toUpperCase() + filter.slice(1)}`;
  };

  // Function to get section description based on filter
  const getSectionDescription = (originalDescription) => {
    if (filter === "all") {
      return originalDescription;
    }
    return `Our dedicated ${filter} team members working together to achieve excellence.`;
  };

  const TeamSection = ({ title, description, members }) => {
    const filteredMembers = filterMembers(members);

    // Only render section if it has members matching the current filters
    if (filteredMembers.length === 0) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              {getSectionTitle(title)}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {getSectionDescription(description)}
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-600 transition-colors duration-300" />

                <div className="p-6 flex flex-col items-center">
                  <div className="w-48 h-48 mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>

                  <p className="text-gray-600 text-sm text-center mb-4">
                    {member.bio}
                  </p>

                  <div className="flex flex-col items-center gap-2 mb-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-600 text-sm flex items-center gap-2 hover:text-green-600"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="text-gray-600 text-sm flex items-center gap-2 hover:text-green-600"
                    >
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </a>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={member.facebook}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.instagram}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <PageHeader title="Our Team" breadcrumb="Our Team" />
      {/* Global Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search all members..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {allDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Sections */}
      {Object.entries(teams).map(([key, { title, description, members }]) => (
        <TeamSection
          key={key}
          title={title}
          description={description}
          members={members}
        />
      ))}

      {/* No Results Message */}
      {Object.values(teams).every(
        (team) => filterMembers(team.members).length === 0
      ) && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No team members found matching your search criteria.
          </p>
        </div>
      )}
    </>
  );
};

export default Scholars;
