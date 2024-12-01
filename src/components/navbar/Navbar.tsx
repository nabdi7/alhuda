"use client";
import React, { useState } from "react";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import MobileMenu from "../menu/Menu";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { name: "About Us", href: "/about" },
    { name: "Announcement", href: "/announcement" },
    { name: "Our Scholars", href: "/scholars" },
    { name: "New to Islam", href: "/new-to-islam" },
  ];

  const services = [
    { name: "Marriage Services", href: "/marriage-service" },
    { name: "Funeral Services", href: "/funeral-service" },
    { name: "Community Support", href: "/community" },
  ];

  // programs
  const programs = [
    { name: "Weekend Islamic School", href: "/islamic-school" },
    // { name: "Men's Halaqah", href: "/mens-halaqah" },
    // { name: "Women's Halaqah", href: "/womens-halaqah" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Mosque Logo"
                width={80}
                height={80}
                className="w-24 h-24 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {/* Pages Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 group inline-flex items-center px-3 py-2 text-sm font-medium hover:text-green-600">
                  <span>Our Masjid</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                <div className="invisible group-hover:visible absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="py-1">
                    {pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 group inline-flex items-center px-3 py-2 text-sm font-medium hover:text-green-600">
                  <span>Services</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                <div className="invisible group-hover:visible absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="py-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Programs Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 group inline-flex items-center px-3 py-2 text-sm font-medium hover:text-green-600">
                  <span>Programs</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                <div className="invisible group-hover:visible absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="py-1">
                    {programs.map((program) => (
                      <Link
                        key={program.name}
                        href={program.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      >
                        {program.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/events"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Events
              </Link>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/donate"
              className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        services={services}
        pages={pages}
        programs={programs}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
