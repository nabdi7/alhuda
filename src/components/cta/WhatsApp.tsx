import React from "react";
import Image from "next/image";
const WhatsAppCTA = () => {
  const whatsappLink = "";

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold text-gray-900">
                Join Our {" "}
                <span className="lg:block text-green-700">WhatsApp Community</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Stay connected with our mosque community. Receive prayer times,
                event updates, and important announcements directly.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl transform rotate-6 blur-sm"></div> */}
              <div className="relative bg-white rounded-3xl shadow-xl p-8">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Image
                      src="/qr.png"
                      width={400}
                      height={400}
                      alt="WhatsApp Group QR Code"
                      className="w-full max-w-[256px] h-auto"
                    />
                  </div>
                  <div className="space-y-4">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl transition-colors duration-200 font-medium"
                    >
                      Join WhatsApp Group
                    </a>
                    <p className="text-center text-sm text-gray-500">
                      Scan QR code or click the button to join
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
