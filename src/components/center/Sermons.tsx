import React from "react";
import { ArrowRight, Youtube, Play } from "lucide-react";
import Link from "next/link";

const SermonsSection = () => {
  const recentSermons = [
    {
      title: "The Importance of Gratitude in Islam",
      speaker: "Sheikh Abdullah",
      date: "November 22, 2024",
      videoId: "example-video-id-1", 
    },
    {
      title: "Understanding Surah Al-Kahf",
      speaker: "Sheikh Abdullah",
      date: "November 15, 2024",
      videoId: "example-video-id-2", 
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/50 rounded-full text-green-700 mb-6">
            <Youtube className="w-5 h-5" />
            <span className="font-medium">Weekly Sermons</span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Weekly Sermons & Lectures
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our latest Friday sermons and educational lectures. Join us live or catch up on previous sessions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Featured Video */}
          <div className="space-y-6">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/featured-video-id" 
                title="Latest Sermon"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 hover:text-green-700 transition-colors">
                The Path to Spiritual Excellence
              </h3>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="font-medium">Sheikh Abdullah</span>
                <span className="text-sm">November 24, 2024</span>
              </div>
            </div>
          </div>

          {/* Recent Sermons */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Sermons</h3>
              <Link
                href="/sermons"
                className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium group"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-8">
              {recentSermons.map((sermon, index) => (
                <div key={index} className="flex gap-6 group cursor-pointer">
                  <div className="flex-shrink-0 w-40">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${sermon.videoId}`}
                        title={sermon.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                      {sermon.title}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">{sermon.speaker}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{sermon.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe Button */}
            <a
              href="https://youtube.com/your-channel" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors mt-4 font-medium group"
            >
              <Youtube className="w-5 h-5" />
              Subscribe to Our Channel
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SermonsSection;