import React from "react";
import { PlayCircle, Book, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[800px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/front.jpeg"
          alt="Mosque Background"
          layout="fill"
          objectFit="cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
            Alhuda Islamic Center of Kent
          </h1>

          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Serving our community with Islamic education, prayer services, and
          social support.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/prayer"
              className="flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 transition-colors duration-300 shadow-xl hover:shadow-2xl"
            >
              Prayer Times
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/donate"
              className="flex items-center gap-2 bg-white text-green-800  px-6 py-3 rounded-lg hover:bg-green-50  transition-colors duration-300 shadow-xl hover:shadow-2xl "
            >
              Donate
            </Link>
          </div>

          {/* Floating Cards */}
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-center gap-8 items-center ">
              <div className="bg-white p-6 rounded-xl shadow-2xl transform transition-all hover:-translate-y-3 hover:scale-105 duration-300 flex items-center space-x-4 max-w-xs w-full">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Book className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Quran Classes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Weekend Islamic School
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-2xl transform transition-all hover:-translate-y-3 hover:scale-105 duration-300 flex items-center space-x-4 max-w-xs w-full">
                <div className="bg-green-100 p-3 rounded-lg">
                  <PlayCircle className="h-7 w-7 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Live Sessions
                  </h3>
                  <p className="text-sm text-gray-600">Join Online Classes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;