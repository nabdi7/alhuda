import React from "react";
import { Book, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block p-3 bg-green-100 rounded-lg">
              <Book className="w-6 h-6 text-green-700" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              Serving Our Community Since 1990
            </h2>
            <p className="text-lg text-gray-600">
              Alhuda Islamic Center has been a cornerstone of the Kent Muslim community 
              for over three decades. We provide a welcoming space for prayer, 
              learning, and building meaningful connections through Islamic education 
              and community programs.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium group"
            >
              Learn More 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/front.jpeg" 
                alt="Mosque Community" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-100 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;