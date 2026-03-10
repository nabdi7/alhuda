import React from "react";
import Image from "next/image";

const AppDownloadCTA = () => {
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
                Download Our{" "}
                <span className="lg:block text-green-700">Mobile App</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Stay connected with our mosque community. Get prayer times,
                event updates, and important announcements directly on your
                phone.
              </p>

              {/* Feature bullets */}
              <ul className="space-y-3 text-gray-600">
                {[
                  "Daily prayer times with Adhan & Iqama",
                //   "Jumu'ah prayer schedule",
                  "Qibla direction finder",
                //   "Monthly prayer timetable",
                  "Upcoming events & programs",
                  "Important announcements & alerts",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com/us/app/alhuda-islamic-center/id6759543309"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-xs opacity-75">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M3.18 23.76c.3.17.65.19.97.07l12.45-7.19-2.78-2.78-10.64 9.9zM.29 1.5C.11 1.83 0 2.22 0 2.67v18.66c0 .45.11.84.29 1.17l.06.06 10.45-10.45v-.25L.35 1.44l-.06.06zM20.93 10.4l-2.81-1.62-3.11 3.11 3.11 3.11 2.83-1.63c.81-.47.81-1.5-.02-1.97zM3.18.24l12.45 7.19-2.78 2.78L2.21.31c.32-.12.67-.1.97-.07z" />
                  </svg>
                  <div>
                    {/* <div className="text-xs opacity-75">Get it on</div> */}
                    <div className="text-xs opacity-75">Android</div>
                    <div className="text-sm font-semibold">Coming Soon</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - App Screenshot */}
          <div className="flex-1 w-full lg:w-auto flex justify-center">
            <div className="relative mx-auto border-green-900 bg-green-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              {/* Side buttons */}
              <div className="h-[32px] w-[3px] bg-green-900 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-green-900 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-green-900 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-green-900 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              {/* Screen */}
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px]">
                <Image
                  src="/img.png"
                  width={272}
                  height={572}
                  alt="Prayer App Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadCTA;
