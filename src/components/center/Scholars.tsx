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
import Image from "next/image";

const Scholars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const teams = {
    // board: {
    //   title: "Board Members",
    //   members: [
    //     {
    //       name: "Sheikh Ahmed Nuur",
    //       role: "Iman",
    //       image: "/abdirahin.JPG",
    //       facebook: "#",
    //       linkedin: "#",
    //       instagram: "#",
    //       email: "example@gmail.com",
    //       phone: "+1 (206) 390-6449",
    //       department: "leadership",
    //     },
    //     {
    //       name: "Sheikh Abdirahin",
    //       role: "Vice President",
    //       image: "/board2.jpg",
    //       facebook: "#",
    //       linkedin: "#",
    //       instagram: "#",
    //       email: "example@gmail.com",
    //       phone: "+1 (206) 390-6449",
    //       department: "leadership",
    //     },
    //     {
    //       name: "Sheikh Abdirahin2",
    //       role: "Vice President",
    //       image: "/abdirahin.JPG",
    //       facebook: "#",
    //       linkedin: "#",
    //       instagram: "#",
    //       email: "example@gmail.com",
    //       phone: "+1 (555) 789-0123",
    //       department: "leadership",
    //     },
    //     {
    //       name: "Sheikh Abdirahin",
    //       role: "Vice President",
    //       image: "/board2.jpg",
    //       facebook: "#",
    //       linkedin: "#",
    //       instagram: "#",
    //       email: "example@gmail.com",
    //       phone: "+1 (206) 390-6449",
    //       department: "leadership",
    //     },
    //   ],
    // },
    imams: {
      title: "Imams",
      members: [
        {
          name: "Sheikh Ahmed Nuur",
          role: "Imam",
          image: "",
          facebook: "https://www.facebook.com",
          linkedin: "https://www.linkedin.com",
          instagram: "https://www.instagram.com",
          email: "example@gmail.com",
          phone: "+1 (206) 390-6449",
          department: "imams",
        },
        {
          name: "Sheikh Abdirahin Albadri",
          role: "Imam",
          image: "/abdirahin.JPG",
          facebook: "https://www.facebook.com/abdirahin.mohameddahir",
          linkedin: "https://www.linkedin.com",
          instagram: "https://www.instagram.com",
          email: "example@gmail.com",
          phone: "+1 (206) 390-6449",
          department: "imams",
        },
      ],
    },
    // volunteers: {
    //   title: "Volunteers",
    //   members: [
    //     {
    //       name: "Sarah Ahmed",
    //       role: "Community Outreach",
    //       image: "/abdirahin.JPG",
    //       facebook: "#",
    //       linkedin: "#",
    //       instagram: "#",
    //       email: "example@gmail.com",
    //       phone: "+1 (555) 567-8901",
    //       department: "volunteers",
    //     },
    //   ],
    // },
    // tech: {
    //   title: "Tech Team",
    //   members: [
    //     {
    //       name: "Najib Abdi",
    //       role: "Web Designer",
    //       image: "/najib.jpg",
    //       facebook: "#",
    //       linkedin: "#",
    //       instagram: "#",
    //       email: "abdinajka@gmail.com",
    //       phone: "+1 (206) 883-3462",
    //       department: "Tech Team",
    //       // url link
    //       linkUrl: "https://example.com/team/najib-abdi",
    //     },
    //   ],
    // },
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

  const TeamSection = ({ title, members }) => {
    const filteredMembers = filterMembers(members);

    // Only render section if it has members matching the current filters
    if (filteredMembers.length === 0) return null;

    return (
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              {getSectionTitle(title)}
            </h2>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {filteredMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-600 transition-colors duration-300" />

                <div className="p-6 flex flex-col items-center">
                  <div className="w-48 h-48 mb-6">
                    <Image
                      src={member.image}
                      width={400}
                      height={400}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>

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
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.instagram}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
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
      <section className="bg-green-50">
        <PageHeader title="Our Scholars" breadcrumb="Our Scholars" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pb-5">
            <div className="flex flex-col items-start">
              <Image
                src="/abdirahin.JPG"
                width={700}
                height={700}
                alt="Dr. Yahya Suufi"
                className="rounded-lg shadow-xl"
              />
              <h2 className="text-4xl font-serif font-bold text-gray-900 mt-6">
                Sheikh Abdirahin Albadri
              </h2>
              <p className="text-green-600 font-medium">Executive & Scholar</p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                Sheikh Abdirahin Albadri was born in Baidoa, Somalia, where he
                completed the memorization of the Holy Quran at the age of 11,
                continuing the rich tradition of Quranic education in his
                community. His family moved to the United States and settled in
                Seattle, Washington. Currently, he serves as a Technical Support
                Engineer for Microsoft Azure Cloud Computing, while
                simultaneously continuing to serve his community as an Imam at
                Alhuda Islamic Center, leading prayers and delivering Friday
                khutbahs.
              </p>
              <p className="text-gray-600">
                Pursuing his passion for knowledge and service, Sheikh Abdirahin
                graduated from the University of Washington with a Bachelor of
                Science in Information Technology. Through his dual roles in
                technology and religious leadership, he bridges professional
                excellence with spiritual guidance, inspiring both young Muslims
                and professionals in the Seattle area to pursue meaningful
                personal and professional development.
              </p>
            </div>
          </div>

          {/* <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
          </div> */}
        </div>
      </section>
      {/* Team Sections */}
      {Object.entries(teams).map(([key, { title, members }]) => (
        <TeamSection key={key} title={title} members={members} />
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
