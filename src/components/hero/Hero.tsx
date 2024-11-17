import React from "react";
import { PlayCircle, Book, ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pb-20 bg-gray-50 min-h-[600px] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute transform -translate-y-1/2"
              style={{
                left: `${i * 25}%`,
                top: "50%",
              }}
            >
              <div className="w-16 h-64 bg-green-800 rotate-12 opacity-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Left Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900">
              Alhuda Islamic Center of Kent
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Join our vibrant community and embark on a journey of spiritual
              growth, learning, and understanding. Discover the beauty of
              Islamic teachings and traditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/prayer" className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors">
                Prayer Times
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/donate" className="flex items-center gap-2 border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
                Donate
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="relative w-full h-[500px]">
              <div className="absolute right-0 w-[450px] h-[450px] rounded-full">
                <img
                  src="/img1.webp"
                  alt="Mosque"
                  className="mx-auto mb-8 rounded-lg shadow-xl"
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute bottom-4 left-0  p-4 rounded-lg shadow-lg flex items-center gap-3 animate-pulse">
              <div className="bg-green-100 p-2 rounded-lg">
                <Book className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Quran Classes</h3>
                <p className="text-sm text-gray-600">
                  Daily Sessions Available
                </p>
              </div>
            </div>

            <div className="absolute top-4 right-0 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-pulse">
              <div className="bg-green-100 p-2 rounded-lg">
                <PlayCircle className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Live Sessions</h3>
                <p className="text-sm text-gray-600">Join Online Classes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
