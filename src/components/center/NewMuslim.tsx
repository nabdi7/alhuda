import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const NewMuslim = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="relative bg-gray-50 overflow-hidden">
        {/* <div className="absolute inset-0 opacity-10">
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
        </div> */}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Your Journey to Islam
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Embarking on a spiritual path is a profound and transformative experience. This guide is designed to help you understand the fundamental principles of Islam, answer your questions, and provide support as you begin your journey of faith.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-6">Understanding Islam</h2>
          <p className="text-lg text-gray-700 mb-4">
            Islam is more than a religion; it is a complete way of life that provides guidance for personal conduct, social interactions, and spiritual growth. At its core, Islam is based on the belief in one God (Allah) and the acceptance of Muhammad (peace be upon him) as His final messenger.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The word "Islam" itself means peace and submission to the will of Allah. Muslims believe that by following the teachings of the Quran and the example of Prophet Muhammad, they can achieve inner peace, social justice, and ultimately, salvation.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-6">Five Pillars of Islam</h2>
          <p className="text-lg text-gray-700 mb-4">
            The practice of Islam is built upon five fundamental principles, known as the Five Pillars:
          </p>
          <ol className="list-decimal pl-8 text-lg text-gray-700 space-y-4">
            <li>
              <strong>Shahada (Declaration of Faith):</strong> Sincerely declaring that "There is no god but Allah, and Muhammad is His messenger." This is the first and most crucial step in becoming a Muslim.
            </li>
            <li>
              <strong>Salah (Prayer):</strong> Performing five daily prayers facing Mecca, which serve as a direct connection between the believer and Allah.
            </li>
            <li>
              <strong>Zakat (Charity):</strong> Giving a portion of one's wealth to help those in need, emphasizing social responsibility and economic justice.
            </li>
            <li>
              <strong>Sawm (Fasting):</strong> Observing fasting during the month of Ramadan from dawn to sunset, which promotes self-discipline, empathy, and spiritual reflection.
            </li>
            <li>
              <strong>Hajj (Pilgrimage):</strong> Making a pilgrimage to Mecca at least once in a lifetime for those who are physically and financially able.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-6">The Holy Quran</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Quran is the holy book of Islam, believed to be the direct word of Allah as revealed to Prophet Muhammad through the Angel Gabriel. It serves as a comprehensive guide for all aspects of life, providing guidance on spiritual, moral, social, and legal matters.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            For new Muslims, beginning to read and understand the Quran can feel overwhelming. It is recommended to start with translations in your native language and seek guidance from knowledgeable scholars or trusted resources.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-6">Your First Steps</h2>
          <p className="text-lg text-gray-700 mb-4">
            Becoming a Muslim is a personal journey of spiritual growth. Here are some recommended first steps:
          </p>
          <ul className="list-disc pl-8 text-lg text-gray-700 space-y-4">
            <li>Learn and understand the Shahada</li>
            <li>Find a local mosque or Islamic center for support</li>
            <li>Connect with a knowledgeable mentor or Islamic community</li>
            <li>Begin learning about Islamic practices and beliefs</li>
            <li>Start reading an accessible translation of the Quran</li>
          </ul>
        </section>


      </div>
    </div>
  );
};

export default NewMuslim;