import React from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const usefulLinks = [
    { name: "Prayer Times", href: "/prayer" },
    { name: "Events Calendar", href: "/events" },
    { name: "Islamic School", href: "/islamic-school" },
    { name: "Donate", href: "/donate" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="space-y-6">
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
            <p className="text-gray-600">
              Serving our community with Islamic education, prayer services, and
              social support.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/alhudakent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-600"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/alhudakent/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-600"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/alhudakent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-600"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Useful Links</h3>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600" />
                <a
                  href="tel:+12536322310"
                  className=" text-gray-600 hover:text-green-600 transition-colors"
                >
                  (253) 632-2310
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600" />
                <a
                  href="mailto:info@alhudakent.org"
                  className=" text-gray-600 hover:text-green-600 transition-colors"
                >
                  info@alhudakent.org
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/D7rp4cSxwRF2df8H9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-gray-600 hover:text-green-600 transition-colors"
                >
                  25650 101st Ave SE
                  <br />
                  Kent, WA 98030
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-8">
          <p className="text-center  text-gray-500">
            © {new Date().getFullYear()} Alhuda Islamic Center. All rights
            reserved.
          </p>
          {/* made by */}
          <p className="text-center text-gray-500">
            Made by{" "}
            <a
              href="https://www.qdwebdesigns.com"
              className="text-green-600 hover:underline"
            >
              QD Web Designs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
