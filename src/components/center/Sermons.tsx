import React from "react";
import { Youtube, Play } from "lucide-react";

const Sermon = () => {
  const featuredVideo = {
    title: "The Path to Spiritual Enlightenment",
    speaker: "Sheikh Abdullah",
    date: "November 24, 2024",
    videoId: "Xkqkptp1MIM",
    description:
      "A profound exploration of spiritual growth and inner peace in contemporary life.",
    channel: {
      name: "Alhuda Islamic Center (Kent, WA)",
      subscribers: "5.2K",
      link: "https://www.youtube.com/@najibcoder",
    },
  };

  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto p-6 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${featuredVideo.videoId}`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 inline-flex items-center gap-2 px-4 py-2 rounded-full">
              <Youtube className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium text-sm">
                Latest Sermon
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              {featuredVideo.title}
            </h2>

            <div className="flex items-center space-x-4 text-gray-600">
              <span className="font-semibold">{featuredVideo.speaker}</span>
              <span className="text-sm">•</span>
              <span className="text-sm">{featuredVideo.date}</span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {featuredVideo.description}
            </p>

            {/* Channel Info and Subscribe */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Youtube className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {featuredVideo.channel.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {featuredVideo.channel.subscribers} Subscribers
                  </p>
                </div>
              </div>

              <a
                href={featuredVideo.channel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium text-sm"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sermon;
