"use client"
"use client"
import React, { useState } from 'react';
import { 
  HeartPulse, 
  Globe, 
  Users, 
  Shield, 
  Headphones,
  Compass
} from 'lucide-react';
import PageHeader from '../header/PageHeader';
const Community = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const supportResources = [
    {
      category: 'Mental Health',
      icon: HeartPulse,
      resources: [
        {
          title: 'Islamic Mental Health Counseling',
          description: 'Culturally sensitive counseling integrating Islamic principles with professional psychological support',
          contacts: [
            { name: 'Muslim Counseling Center', phone: '(800) 273-8255' },
            { name: 'Dr. Ahmed Psychological Services', phone: '(555) 123-4567' }
          ],
          website: 'https://www.islamicmentalhealth.org'
        }
      ]
    },
    {
      category: 'Crisis Intervention',
      icon: Shield,
      resources: [
        {
          title: 'Crisis Support Hotline',
          description: 'Immediate support for individuals experiencing emotional distress, trauma, or immediate safety concerns',
          contacts: [
            { name: 'National Crisis Helpline', phone: '988' },
            { name: 'Domestic Violence Hotline', phone: '(800) 799-7233' }
          ],
          website: 'https://suicidepreventionlifeline.org'
        }
      ]
    },
    {
      category: 'Family Support',
      icon: Users,
      resources: [
        {
          title: 'Family Counseling Services',
          description: 'Comprehensive support for family conflicts, marital issues, and parenting challenges',
          contacts: [
            { name: 'Islamic Family Counseling Center', phone: '(555) 987-6543' },
            { name: 'Community Family Support Hotline', phone: '(800) 624-8107' }
          ],
          website: 'https://www.islamicfamilysupport.org'
        }
      ]
    },
    {
      category: 'Youth Support',
      icon: Compass,
      resources: [
        {
          title: 'Youth Mentorship Program',
          description: 'Guidance and support for young Muslims navigating personal, educational, and spiritual challenges',
          contacts: [
            { name: 'Muslim Youth Helpline', phone: '(866) 437-9548' },
            { name: 'College Student Support', phone: '(555) 246-8135' }
          ],
          website: 'https://www.muslimyouthsupport.org'
        }
      ]
    },
    {
      category: 'Addiction Recovery',
      icon: Headphones,
      resources: [
        {
          title: 'Substance Abuse Support',
          description: 'Confidential support and resources for individuals struggling with addiction',
          contacts: [
            { name: 'Muslim Recovery Network', phone: '(877) 644-6472' },
            { name: 'Faith-Based Recovery Center', phone: '(555) 135-7910' }
          ],
          website: 'https://www.muslimrecoverynetwork.org'
        }
      ]
    }
  ];

  const categories = ['All', ...new Set(supportResources.map(resource => resource.category))];

  const filteredResources = activeCategory === 'All' 
    ? supportResources 
    : supportResources.filter(resource => resource.category === activeCategory);

  return (
    <>
    <PageHeader title="Community Resources" breadcrumb="Community Resources" />
    <div className="bg-gray-50 py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Minimalist Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-green-700 text-white' 
                  : 'bg-green-50 text-green-800 hover:bg-green-100'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Minimalist Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resourceGroup, groupIndex) => {
            const Icon = resourceGroup.icon;
            return resourceGroup.resources.map((resource, resourceIndex) => (
              <div 
                key={`${groupIndex}-${resourceIndex}`}
                className="bg-white rounded-xl shadow-md p-6 border border-green-50 hover:shadow-lg transition-all duration-300"
              >
                {/* Minimalist Resource Header */}
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2.5 rounded-full mr-3">
                    <Icon className="text-green-700 w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900">
                    {resource.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  {resource.description}
                </p>

                {/* Minimalist Contacts */}
                <div className="space-y-3 mb-5">
                  <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider">
                    Contacts
                  </h4>
                  {resource.contacts.map((contact, contactIndex) => (
                    <div 
                      key={contactIndex} 
                      className="flex justify-between items-center bg-green-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-green-900">{contact.name}</p>
                        <a 
                        href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-xs text-gray-600 mt-10">{contact.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Website Link */}
                {resource.website && (
                  <a 
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full block text-center 
                      bg-green-700 text-white 
                      py-2.5 rounded-lg 
                      text-sm 
                      hover:bg-green-800 
                      transition-colors
                    "
                  >
                    <Globe className="w-4 h-4 inline-block mr-2 -mt-1" />
                    Visit Website
                  </a>
                )}
              </div>
            ));
          })}
        </div>

    
      </div>
    </div>
    </>
  );
};

export default Community;