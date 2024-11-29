import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHeader from "../header/PageHeader";
const Contact = () => {
  return (
    <section className="bg-gray-50">
      <PageHeader title="Contact Us" breadcrumb="Contact" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-bold mb-2">Phone</h3>
            <p className="text-gray-600">(253) 632-2310</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-gray-600">info@alhudakent.org</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-bold mb-2">Address</h3>
            <p className="text-gray-600">25650 101st Ave SE, Kent, WA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 py-16 space-y-6">
            <form className="space-y-6 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Type your message..."
                  required
                  className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-green-700 text-white rounded-[24px] hover:bg-green-800 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="h-[600px] rounded-[24px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2766939.681560598!2d-122.20584699999999!3d47.371171!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54905eb5bf39c87b%3A0xd97531dae44de0bb!2sMasjid%20Al-Hudaa!5e0!3m2!1sen!2sus!4v1731899741353!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
