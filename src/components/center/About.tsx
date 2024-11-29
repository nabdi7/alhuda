import React from "react";
import { Home, Heart, BookOpen, Users } from "lucide-react";
import PageHeader from "@/components/header/PageHeader";
const About = () => {
  return (
    <section className="bg-gray-50">
      <PageHeader title="About Us" breadcrumb="About" />
      {/* Mission Statement Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Mission
            </h1>
            <p className="text-lg text-gray-600">
              Alhuda Islamic Center of Kent is dedicated to serving the Muslim
              community by providing a welcoming space for worship, education,
              and community engagement. We strive to promote Islamic values
              while fostering understanding and cooperation with our broader
              community.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-bold text-xl mb-2">Spiritual Growth</h3>
              <p className="text-gray-600">
                Providing a sacred space for worship and spiritual development
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-bold text-xl mb-2">Education</h3>
              <p className="text-gray-600">
                Offering comprehensive Islamic education for all ages
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-bold text-xl mb-2">Community</h3>
              <p className="text-gray-600">
                Building strong bonds within our diverse community
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-bold text-xl mb-2">Service</h3>
              <p className="text-gray-600">
                Serving humanity through charitable works and outreach
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Our History
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in [Year], Alhuda Islamic Center began as a small
                  gathering of Muslim families in Kent who shared a vision of
                  establishing a center for Islamic worship and education.
                </p>
                <p>
                  Over the years, our community has grown significantly,
                  allowing us to expand our facilities and services. Today, we
                  serve hundreds of families in the greater Kent area, offering
                  daily prayers, educational programs, and community services.
                </p>
                <p>
                  Our center has become a beacon of Islamic knowledge and
                  interfaith dialogue, hosting numerous events and programs that
                  bring together people from all walks of life.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/front.jpeg"
                  alt="Mosque History"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-green-100 rounded-lg opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision for Future Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/front.jpeg"
                  alt="Future Vision"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-100 rounded-full opacity-50" />
            </div>
            <div className="order-1 lg:order-2 space-y-4 text-gray-600">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                Our Vision for the Future
              </h2>
              <p>
                As we look to the future, Alhuda Islamic Center envisions
                expanding our impact through innovative programs and facilities
                that meet the evolving needs of our growing community.
              </p>
              <p>
                We aim to establish comprehensive educational initiatives,
                enhance our community services, and create more opportunities
                for interfaith dialogue and cultural exchange.
              </p>
              <p>
                Our goal is to continue being a cornerstone of the Muslim
                community while fostering unity, understanding, and cooperation
                among people of all faiths and backgrounds in the greater Kent
                area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
