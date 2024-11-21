"use client";
import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  pages: { name: string; href: string }[];
  services: { name: string; href: string }[];
  programs: { name: string; href: string }[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  pages,
  services,
  programs,
  onClose,
}) => {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-4 p-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="px-2 pt-16 pb-3 space-y-1">
            {/* Mobile Pages Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPagesOpen(!isPagesOpen)}
                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              >
                <span>Our Center</span>
                <ChevronDown
                  className={`h-4 w-4 transform ${
                    isPagesOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>
              <div
                className={`pl-4 overflow-hidden transition-all duration-200 ease-in-out ${
                  isPagesOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                {pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                    onClick={onClose}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transform ${
                    isServicesOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>
              <div
                className={`pl-4 overflow-hidden transition-all duration-200 ease-in-out ${
                  isServicesOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                    onClick={onClose}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              >
                <span>Programs</span>
                <ChevronDown
                  className={`h-4 w-4 transform ${
                    isProgramsOpen ? "rotate-180" : ""
                  } transition-transform duration-200`}
                />
              </button>
              <div
                className={`pl-4 overflow-hidden transition-all duration-200 ease-in-out ${
                  isProgramsOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                {programs.map((program) => (
                  <Link
                    key={program.name}
                    href={program.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
                    onClick={onClose}
                  >
                    {program.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/prayer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              onClick={onClose}
            >
              Prayer Times
            </Link>
            <Link
              href="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              onClick={onClose}
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              onClick={onClose}
            >
              Contact
            </Link>
            <Link
              href="/donate"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              onClick={onClose}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
